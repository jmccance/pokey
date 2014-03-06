express   = require 'express'
http      = require 'http'
socketio  = require 'socket.io'

Pokey = require './lib/pokey'

app = express()
server = http.createServer(app)
io = socketio.listen(server)

app
  .use(express.logger())
  .use(express.cookieParser())
  .use(express.cookieSession(
    secret: 'TODO'
    key: 'pokey.session'
    cookie:
      httpOnly: false
  ))
  .use(express.static(__dirname + '/static'))

io.configure 'development', ->
  io.set 'transports', ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']

pokey = new Pokey(io.sockets)

server.listen 8088, ->
  address = server.address()
  console.log('Pokey started at http://%s:%s', address.address, address.port)
