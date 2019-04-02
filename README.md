# moby-binary-poc

Proof of concept for Mobytrader Binary.com integration

### Installation

```bash
# fetch this repository
git@github.com:raunakkathuria/moby-binary-poc.git

# enter the repository
cd moby-binary-poc

# install
npm install
```

### Run

```bash
CONNECTION_HOST=<connection_host> APP_ID=<app_id> node index.js
```

### Usage


- Go to `http://localhost:3000` and click on `Login`.

- Enter your binary.com credentials on OAuth page and provide access.

- You will be redirected to `http://localhost:3000/oauth/redirect`.

- Click on `Authorize` to authorize the WebSocket connection, refer https://developers.binary.com/api/#authorize for more details. Please note `authorize` call is pre-requisite for performing other requests.


  - if you see an error like this 

    ```json
     "error": {
        "code": "AuthorizationRequired",
        "message": "Please log in."
      },
    ```

    then please authorize again.

- Click on `Get balance` to get the balance for the current user. Binary.com API call: <https://developers.binary.com/api/#balance>.

- Click on `Get settings` to get current account details. Binary.com API call:  <https://developers.binary.com/api/#get_settings>.

- Based on the get_settings response you will be given an option to perform payment agent transfer to the client, If you are authorized payment agent.

- For payment agent only


    - Click on `Payment agent transfer`, to transfer to client, if you have logged in as payment agent and on success, Mobytrader will add a hook to trigger their withdraw API call to withdraw money from their client account. Binary.com API call: <https://developers.binary.com/api/#paymentagent_transfer>.

- For normal client


    - Click on `Payment agent withdraw`, to withdraw to payment agent, if you have logged in as a normal client and on success, mobytrader will add a hook to trigger their deposit API call to transfer money to their client account. Binary.com API call: <https://developers.binary.com/api/#paymentagent_withdraw>.
