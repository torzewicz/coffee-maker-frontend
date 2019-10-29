import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const SERVER_URL = 'f948d8e1.ngrok.io';


export class CoffeeClientService {

    connect() {

        this.stompClient = new StompJS.Client({
            brokerURL: 'ws://' + SERVER_URL + "/connect",
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });


// Fallback code
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

    updateIngredients(ingredients) {
        this.stompClient.publish({
            destination: '/app/ingredients/update',
            body: JSON.stringify(ingredients)
        });
    }

    subscribeForIngredients(callback) {
        return this.stompClient.subscribe("/topic/ingredients", callback)
    }

    setConnected(isConnected) {
        console.log(`Connected: ${isConnected}`)
    }
}
