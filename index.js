const fastify = require('fastify')({
  logger: true
});

const resolve = require('path').resolve

fastify.register(require('fastify-cookie'));

// plugins
fastify.register(require('point-of-view'), {
    engine: {
        pug: require('pug')
    },
    templates: 'public',
    includeViewExtension: true,
    options: {
        filename: resolve('public/views')
    }
})

fastify.register(require('./route'));

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});
