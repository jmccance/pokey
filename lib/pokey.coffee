Room = require './model/room'
User = require './model/user'

##
# Manages the controllers and routes for a Pokey instance. At the moment, it just *is* the
# controller.
class Pokey
  ##
  # Configure the provided socket.io server with the Pokey API.
  constructor: (@io) ->
    @sessions = {}

    @io.sockets.on 'connection', (socket) ->
      socket.on 'register', (req) ->
        sessionId = req.sessionId
        user = 
          if !@sessions[sessionId]?
            @sessions[sessionId] = {} # new User(name); User.add(user)
          else
            @sessions[sessionId]

        user.name = req.name
        socket.set('user', user)

      socket.on 'createRoom', (req) ->
        user = socket.get('user')

        # Create a new room object with the name specified in the request,
        # and with the requesting user as the owner.
        room = {} # new Room(name, owner); Room.add(room)
        
        # Return the newly created room object to the client. The client will
        # use the room ID to generate a URL that others can use to join the
        # room (and the owner can use to rejoin if disconnected.)
        socket.emit 'log', 'createRoom event'

      socket.on 'joinRoom', (req) ->
        # Get the user from the socket.
        user = socket.get('user')

        # Get room from room repo. Error if does not exist.
        room = {} # Room.get(req.roomId)

        # Add user to room object.
        # Set room (or room ID) to socket
        socket.set('room', room)

      socket.on 'submitEstimate', (req) ->
        # Get the user and current room from the socket.
        user = socket.get('user')
        room = socket.get('room')

        # room.setEstimate(user.id, estimate)

      socket.on 'showEstimates', ->
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Toggle the estimate visibility to visible.
        if user.id == room.owner.id
          room.isRevealed = true

      socket.on 'hideEstimates', ->
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Toggle the estimate visibility to concealed.
        if user.id == room.owner.id
          room.isRevealed = false

      socket.on 'clearEstimates', ->
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Clear the room estimates.

module.exports = Pokey
