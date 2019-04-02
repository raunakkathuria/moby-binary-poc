async function routes(fastify, options) {

    fastify.get('/', (request, reply) => {
        let connectionHost = process.env.CONNECTION_HOST;
        let appId = process.env.APP_ID;

        reply.setCookie('connection_host', connectionHost).setCookie('app_id', appId).view('views/index', {});
    })

    fastify.get('/oauth/redirect', (request, reply) => {
        let loginid = request.query.acct1;
        let token = request.query.token1;
        let connectionHost = process.env.CONNECTION_HOST;
        let appId = process.env.APP_ID;

        reply.setCookie('connection_host', connectionHost).setCookie('app_id', appId).setCookie('loginid', loginid).setCookie('authorize_token', token).view('views/redirect', {});
    })
}

module.exports = routes