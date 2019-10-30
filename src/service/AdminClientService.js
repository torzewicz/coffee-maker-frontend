import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const SERVER_URL = '6b651a97.ngrok.io';


export class AdminClientService {

    connect(callback) {

        this.stompClient = new StompJS.Client({
            brokerURL: 'ws://' + SERVER_URL + "/connect",
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });


        if (typeof WebSocket !== 'function') {
            this.stompClient.webSocketFactory =  () => {
                return new SockJS('http://' + SERVER_URL + '/connect');
            };
        }

        this.stompClient.onConnect = (frame) => {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
        };

        this.stompClient.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        this.stompClient.activate();

        if (callback !== undefined) {
            this.stompClient.onConnect(callback)
        }
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        this.setConnected(false);
        console.log("Disconnected");
    }

    askForIngredients() {
        // let message = {name: name};

        this.stompClient.publish({
            destination: '/app/ingredients'
            // body: JSON.stringify(message)
            // body:
        });
    }

    subscribeForIngredients(callback) {
        return this.stompClient.subscribe("/topic/ingredients", callback)
    }

    setConnected(isConnected) {
        console.log(`Connected: ${isConnected}`)
    }

    subscribeForAllAlerts(callback) {
        return this.stompClient.subscribe("/topic/admin/alert/all", callback)
    }

    askForAlerts() {
        this.stompClient.publish({
            destination: '/app/alert/all'
        });
    }

    subscribeForRealTimeAlerts(callback) {
        return this.stompClient.subscribe("/topic/admin/alert", callback)
    }

}
