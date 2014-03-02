restify = require 'restify'
bunyan = require 'bunyan'

log = bunyan.createLogger(
  name: 'pokey'
  streams: [
    {
      stream: process.stdout
      level: 'debug'
    }
    {
      path: 'pokey.log'
      level: 'trace'
    }
  ]
  serializers: restify.bunyan.serializers
)

server = restify.createServer(log: log)

###
# Plugins
###
server.use restify.bodyParser(mapParams: false)

###
# Routes
###

server.get '/api/rooms', (req, res, next) ->
server.get '/api/rooms/:roomId', (req, res, next) ->

# Static resources
# NOTE: serveStatic is currently busted. Until they fix it, I'm manually
# adjusting restify/lib/plugins/static.js to do a simple join of directory
# with the URL part. Awful, but effective.
server.get /\/?.*/, restify.serveStatic
  directory: './public'
  default: 'index.html'


server.listen 8080, ->
  console.log('%s listening at %s', server.name, server.url)
