function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function addEvents() {
    document.addEventListener('click', function(event) {
        let clickedElementId = event.target.id;

        let currentRequest;
        let requestTextarea = document.querySelector("#request_area_output");
        let responseTextarea = document.querySelector("#response_area_output");

        if (clickedElementId && clickedElementId === 'authorize_connection') {
            responseTextarea.value = null;
            currentRequest = {
                "authorize": getCookie("authorize_token")
            };
            requestTextarea.value = JSON.stringify(currentRequest, null, 2);
            ReconnectSocket.send(currentRequest);
        }

        if (clickedElementId && clickedElementId === 'get_settings') {
            responseTextarea.value = null;
            currentRequest = {
                "get_settings": 1
            };

            requestTextarea.value = JSON.stringify(currentRequest, null, 2);
            ReconnectSocket.send(currentRequest);
        };

        if (clickedElementId && clickedElementId === 'get_balance') {
            responseTextarea.value = null;
            currentRequest = {
                "balance": 1
            };

            requestTextarea.value = JSON.stringify(currentRequest, null, 2);
            ReconnectSocket.send(currentRequest);
        };

        if (clickedElementId && clickedElementId === 'payment_agent_withdraw') {
            let paymentagent_loginid = document.querySelector('#paymentagent_loginid').value;
            if (paymentagent_loginid) {
                responseTextarea.value = null;
                currentRequest = {
                    "paymentagent_withdraw": 1,
                    "paymentagent_loginid": paymentagent_loginid,
                    "currency": "USD",
                    "amount": 10,
                    "verification_code": "my_verification_code"
                };

                requestTextarea.value = JSON.stringify(currentRequest, null, 2);
                ReconnectSocket.send(currentRequest);
            } else {
                alert("Please enter payment agent loginid.");
                return;
            }
        };

        if (clickedElementId && clickedElementId === 'payment_agent_transfer') {
            let client_loginid = document.querySelector('#client_loginid').value;
            if (client_loginid) {
                responseTextarea.value = null;
                currentRequest = {
                    "paymentagent_transfer": 1,
                    "transfer_to": client_loginid,
                    "currency": "USD",
                    "amount": 10
                };

                requestTextarea.value = JSON.stringify(currentRequest, null, 2);
                ReconnectSocket.send(currentRequest);
            } else {
                alert('Please enter client loginid.');
                return;
            }
        };
    }, false);

    let login_button = document.querySelector('#login_button');
    if (login_button) {
        login_button.href = "https://" + getCookie("connection_host") + "/oauth2/authorize?app_id=" + getCookie("app_id") + "&l=EN&signup_device=desktop&date_first_contact=2019-04-02";
    }
}

ready(addEvents);