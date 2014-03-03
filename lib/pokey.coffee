##
# Manages the controllers and routes for a Pokey instance. At the moment, it just *is* the
# controller.
class Pokey
  ##
  # Configure the provided socket.io server with the Pokey API.
  constructor: (@io) ->
    @io.sockets.on 'connection', (socket) ->
      # TODO Associate this socket with a user.
      # TODO

      socket.on 'createRoom', (room) ->
        socket.emit 'log', 'createRoom event'

      socket.on 'joinRoom', (room) ->
        socket.emit 'log', 'joinRoom event'

      socket.on 'submitEstimate', (estimate) ->
        socket.emit 'log', 'submitEstimate event'

      socket.on 'showEstimates', ->
        socket.emit 'log', 'showEstimates event'

      socket.on 'hideEstimates', ->
        socket.emit 'log', 'hideEstimates event'

      socket.on 'clearEstimates', ->
        socket.emit 'log', 'clearEstimates event'

module.exports = Pokey
