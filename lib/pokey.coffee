Room = require './model/room'
User = require './model/user'

##
# Manages the controllers and routes for a Pokey instance. At the moment, it just *is* the
# controller.
class Pokey
  ##
  # Configure the provided socket.io server with the Pokey API.
  constructor: (sockets) ->
    @_sessions = {}

    sockets.on 'connection', (socket) =>
      ##
      # Register with your username. If the session is not already associated with a user, creates
      # a new one. Otherwise, simply updates the user's name with that provided in the request.
      #
      # @param {object} req
      # @param {string} req.sessionId - the session ID, which the client got from its cookie
      # @param {string} req.name - the name to register for this user
      socket.on 'register', (req) =>
        sessionId = req.sessionId
        user = 
          if !@_sessions[sessionId]?
            User.add(new User())
          else
            @_sessions[sessionId]

        user.name = req.name
        socket.set('user', user)

      ##
      # Create a new room. The user must be registered. The user will be the owner of the created
      # room.
      #
      # @param {object} req
      # @param {string} req.roomName - the name to give the room
      socket.on 'createRoom', =>
        user = socket.get('user')

        # If no user is registered, return an error code.

        # Create a new room owned by the user.
        room = Room.add(new Room(user))
        
        # Return the newly created room object to the client. The client will
        # use the room ID to generate a URL that others can use to join the
        # room (and the owner can use to rejoin if disconnected.)
        socket.emit('roomCreated', room.toJSON())

      ##
      # Join the specified room.
      #
      # @param {object} req
      # @param {string} req.roomId - the ID of the room to join
      socket.on 'joinRoom', (req) =>
        # Get the user from the socket. If unregistered, return an error.
        user = socket.get('user')

        # Get room from room repo. Error if does not exist.
        room = Room.get(req.roomId)

        # Add user to room.
        room.addUser(user)

        # Set room (or room ID) to socket
        socket.set('room', room)
        socket.join(room.id)

        # Inform everyone that someone joined the room. Serves double-duty to provide the current
        # room state to the new member.
        sockets.in(room.id).emit('roomUpdated', room.toJSON())

      ##
      # Submit an estimate to the room.
      #
      # @param {Estimate} estimate
      socket.on 'submitEstimate', (estimate) =>
        # Get and validate the user and current room from the socket.
        user = socket.get('user')
        room = socket.get('room')

        # Set the user's estimate in this room.
        # If this changed the user's estimate, broadcast that to everyone else.
        if room.setEstimate(user, estimate)
          sockets.in(room.id).emit('roomUpdated', room.toJSON())

      ##
      # Reveal estimates to members of the room.
      socket.on 'showEstimates', =>
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Toggle the estimate visibility to visible.
        if room.isOwnedBy(user)
          room.isRevealed = true

          # Broadcast the revealed room to everyone.
          sockets.in(room.id).emit('roomUpdated', room.toJSON())

      ##
      # Conceal everyone's estimates. And I guess hope they have the memory of a goldfish and no
      # logging enabled. Included for completeness, I guess?
      socket.on 'hideEstimates', =>
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Toggle the estimate visibility to concealed.
        # Update everyone about the new room state.
        if room.isOwnedBy(user)
          room.isRevealed = false

          # Broadcast the revised room state.
          sockets.in(room.id).emit('roomUpdated', room.toJSON())

      ##
      # Clear the current estimates.
      socket.on 'clearEstimates', =>
        # Get the user and current room from the socket
        user = socket.get('user')
        room = socket.get('room')

        # Verify that the user owns the room.
        # Clear the room estimates.
        # Broadcast the updated room state.
        if room.isOwnedBy(user)
          room.clearEstimates()
          sockets.in(room.id).emit('roomUpdated', room.toJSON())

module.exports = Pokey
