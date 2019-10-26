import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const SERVER_URL = 'localhost:8080';


export class CoffeeClientService {

    connect() {

        this.stompClient = new StompJS.Client({
            brokerURL: 'ws://' + SERVER_URL + "/connect",
            // connectHeaders: {
            //     login: "user",
            //     passcode: "password"
            // },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });


// Fallback code
        if (typeof WebSocket !== 'function') {
            // For SockJS you need to set a factory that creates a new SockJS instance
            // to be used for each (re)connect
            this.stompClient.webSocketFactory =  () => {
                // Note that the URL is different from the WebSocket URL
                return new SockJS('http://' + SERVER_URL + '/connect');
            };
        }

        this.stompClient.onConnect = (frame) => {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            this.subscribeForHellos();

        };

        this.stompClient.onStompError = (frame) => {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
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

    subscribeForHellos() {
        return this.stompClient.subscribe("/topic/hello", (message) => {
            let hello = JSON.parse(message.body)
            console.log("HELLO", hello)
        });
    }


    sendName(name) {
        let message = {name: name};

        this.stompClient.publish({
            destination: '/app/hello',
            body: JSON.stringify(message)
        });

    }

    setConnected(isConnected) {
        console.log(`Connected: ${isConnected}`)
    }
}
