function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
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
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function addEvents() {
    let currentRequest;

    let requestTextarea = document.querySelector("#request_area_output");
    let responseTextarea = document.querySelector("#response_area_output");

    document.querySelector('#authorize_connection').addEventListener('click', function() {
        responseTextarea.value = null;
        currentRequest = { "authorize" : getCookie("authorize_token") };

        requestTextarea.value = JSON.stringify(currentRequest, null, 2);
        ReconnectSocket.send(currentRequest);
    });

    document.querySelector('#get_settings').addEventListener('click', function() {
        responseTextarea.value = null;
        currentRequest = { "get_settings": 1 };

        requestTextarea.value = JSON.stringify(currentRequest, null, 2);
        ReconnectSocket.send(currentRequest);
    });

    document.querySelector('#get_balance').addEventListener('click', function() {
        responseTextarea.value = null;
        currentRequest = { "balance": 1 };

        requestTextarea.value = JSON.stringify(currentRequest, null, 2);
        ReconnectSocket.send(currentRequest);
    });

    document.querySelector('#payment_agent_withdraw').addEventListener('click', function() {
        responseTextarea.value = null;
        currentRequest = {
          "paymentagent_withdraw": 1,
          "paymentagent_loginid": "CR90000000",
          "currency": "USD",
          "amount": 10,
          "verification_code": "my_verification_code"
        };

        requestTextarea.value = JSON.stringify(currentRequest, null, 2);
        ReconnectSocket.send(currentRequest);
    });

    document.querySelector('#payment_agent_transfer').addEventListener('click', function() {
        responseTextarea.value = null;
        currentRequest = {
          "paymentagent_transfer": 1,
          "transfer_to": "CR90000001",
          "currency": "USD",
          "amount": 10
        };

        requestTextarea.value = JSON.stringify(currentRequest, null, 2);
        ReconnectSocket.send(currentRequest);
    });
}

ready(addEvents);
