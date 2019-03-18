/*
 * It provides a abstraction layer over native javascript Websocket.
 *
 * Provide additional functionality like if connection is close, open
 * it again and process the buffered requests
 *
 * Usage:
 *
 * ReconnectSocket.init() // initial connection
 * ReconnectSocket.send({sample: "key"}), ReconnectSocket.send("plain message") // send your data
 * ReconnectSocket.close() // close the connection
 * ReconnectSocket.clear() // clear buffer if you want to instantiate new connection
 */

let ReconnectSocket = (function () {
    'use strict';

    let socket,
        socketUrl = getCookie("socket_url"),
        bufferedSends = [],
        isJSON = 1; // flag to indicate whether you send JSON message

    let status = function () {
        return socket && socket.readyState;
    };

    let isReady = function () {
        return socket && socket.readyState === 1;
    };

    let isClose = function () {
        return !socket || socket.readyState === 3;
    };

    let sendBufferedSends = function () {
        while (bufferedSends.length > 0) {
            if (isJSON) {
                socket.send(JSON.stringify(bufferedSends.shift()));
            } else {
                socket.send(bufferedSends.shift());
            }
        }
    };

    let init = function () {
        if(isClose()){
            socket = new WebSocket(socketUrl);
        }

        socket.onopen = function (){
            sendBufferedSends();
        };

        // implement your server response handling here
        socket.onmessage = function (msg){
            let result = JSON.parse(msg.data);
            console.log(result);
            let responseTextarea = document.querySelector("#response_area_output");
            responseTextarea.value = JSON.stringify(result, null, 2);
            if (result["msg_type"] === "authorize") {
                document.querySelector('.chain_with_authorize').style.display="block";
            }

            if (result["msg_type"] === "get_settings") {
                if (result["get_settings"]["is_authenticated_payment_agent"]) {
                    document.querySelector('#payment_agent_transfer').style.display="block";
                    document.querySelector('#paymentagent_message').style.display="block";
                } else {
                    document.querySelector('#payment_agent_withdraw').style.display="block";
                }
                alert("Login or create a new account on mobytrader based on details you get from get_settings api call.");
            }

            if (result["msg_type"] === "paymentagent_transfer" && result["transaction_id"]) {
                alert("Deposit to client account by payment agent is completed on binary.com side. Add a mobytrader API hook here to withdraw money from mobytrader client account. Use get_balance API call to get current balance of current authorized account.");
            }

            if (result["msg_type"] === "paymentagent_withdraw" && result["transaction_id"]) {
                alert("Withdraw to payment agent from client account is completed on binary.com side. Add a mobytrader API hook here to deposit money to mobytrader client account. Use get_balance API call to get current balance of current authorized account.");
            }
        };

        socket.onclose = function (e) {
            console.log("socket closed", e);
        };

        socket.onerror = function (error) {
            console.log('socket error', error);
        };
    };

    let send = function(data) {
        // check if its close then initilaize again
        if (isClose()) {
            bufferedSends.push(data);
            init();
        } else if (isReady()) {
            if (isJSON) {
                socket.send(JSON.stringify(data));
            } else {
                socket.send(data);
            }
        } else {
            bufferedSends.push(data);
        }
    };

    let close = function () {
        bufferedSends = [];
        if (socket) {
            socket.close();
        }
    };

    let clear = function(){
        bufferedSends = [];
    };

    return {
        init: init,
        send: send,
        close: close,
        clear: clear
    };
})();
