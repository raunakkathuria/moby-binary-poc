async function routes (fastify, options) {

  fastify.get('/', (request, reply) => {
      reply.view('views/index', {});
  })

  fastify.get('/oauth/redirect', (request, reply) => {
    let loginid   = request.query.acct1;
    let token     = request.query.token1;
    let socketUrl = process.env.SOCKET_URL;
    reply.setCookie('socket_url', socketUrl).setCookie('loginid', loginid).setCookie('authorize_token', token).view('views/redirect', {});
  })
}

module.exports = routes
