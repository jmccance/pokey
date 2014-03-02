restify = require 'restify'
connect = require 'connect'

server = restify.createServer()

###
  Plugins
###
server.use restify.bodyParser(mapParams: false)

###
  Routes
###

# API routes
server.get '/api/rooms', (req, res, next) ->
server.get '/api/rooms/:roomId', (req, res, next) ->

# Static client route
server.get /\/?.*/, restify.serveStatic
  directory: './static'
  default: 'index.html'


###
  Configure Connect middleware and launch app
###

middleware = connect()
  .use(connect.logger())
  .use(connect.cookieParser())
  # TODO Move secret into local config
  .use(connect.cookieSession(secret: 'blort', key: 'pokey.sess'))
  # Note: This bit connects Restify to Connect
  .use('/', (req, res) -> server.server.emit('request', req, res))

middleware.listen 8080, ->
  console.log('%s listening at %s', server.name, server.url)
