restify = require 'restify'
connect = require 'connect'
socketio = require 'socket.io'

Pokey = require './lib/pokey'

server = restify.createServer()
io = socketio.listen(server)

###
  Plugins
###
server.use restify.bodyParser(mapParams: false)

###
  Routes
###

# Configure the API
pokey = new Pokey(io)

# Configure the static client
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
