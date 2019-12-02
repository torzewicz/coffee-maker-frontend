import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const SERVER_URL = '127.0.0.1:8080';



export class CoffeeClientService {

    connect(callback) {

        this.stompClient = new StompJS.Client({
            brokerURL: 'ws://' + SERVER_URL + "/connect",
            debug: function (str) {
                // console.log(str);
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
            // console.log('Broker reported error: ' + frame.headers['message']);
            // console.log('Additional details: ' + frame.body);
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
        // console.log("Disconnected");
    }

    askForIngredients() {

        console.log("Asked for ingredients")
        // let message = {name: name};

        this.stompClient.publish({
            destination: '/app/ingredients'
            // body: JSON.stringify(message)
            // body:
        });
    }

    updateIngredients(ingredients) {

        console.log("updated ingredients")


        this.stompClient.publish({
            destination: '/app/ingredients/update',
            body: JSON.stringify(ingredients)
        });
    }


    sendAlert(message) {
        this.stompClient.publish({
            destination: '/app/alert',
            body: JSON.stringify(message)
        });
    }

    subscribeForIngredients(callback) {
        return this.stompClient.subscribe("/topic/ingredients", callback)
    }

    setConnected(isConnected) {
        // console.log(`Connected: ${isConnected}`)
    }

}
