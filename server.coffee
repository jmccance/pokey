express   = require 'express'
http      = require 'http'
socketio  = require 'socket.io'

Pokey = require './lib/pokey'

app = express()
server = http.createServer(app)
io = socketio.listen(server)

io.configure 'development', ->
  io.set 'transports', ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']

pokey = new Pokey(io.sockets)

app.use(express.logger())
  .use(express.static(__dirname + '/static'))

server.listen 8088, ->
  address = server.address()
  console.log('Pokey started at http://%s:%s', address.address, address.port)
