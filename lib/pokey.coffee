Estimate = require './model/estimate'
Room = require './model/room'
User = require './model/user'

##
# Manages the controllers and routes for a Pokey instance. At the moment, it just *is* the
# controller.
class Pokey
  ##
  # Configure the provided socket.io server with the Pokey API.
  constructor: (app, sockets) ->
    @_sessions = {}

    app.get '/stats', (req, res) =>
      res.json
        rooms: Room.all()
        users: User.all()

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
            @_sessions[sessionId] = User.add(new User())
          else
            @_sessions[sessionId]

        user.name = req.name
        socket.set('user', user)
        socket.emit('registered', user)

      ##
      # Create a new room. The user must be registered. The user will be the owner of the created
      # room.
      #
      # @param {object} req
      # @param {string} req.roomName - the name to give the room
      socket.on 'createRoom', =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not get user for socket', error)
            return

          # Create a new room owned by the user.
          room = Room.add(new Room(user))

          # Return the newly created room object to the client. The client will
          # use the room ID to generate a URL that others can use to join the
          # room (and the owner can use to rejoin if disconnected.)
          socket.emit('roomCreated', room.sanitized())

      ##
      # Join the specified room.
      #
      # @param {object} req
      # @param {string} req.roomId - the ID of the room to join
      socket.on 'joinRoom', (req) =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'must register before joining a room')
            return

          # Get room from room repo. Error if does not exist.
          room = Room.get(req.roomId)

          if !room?
            socket.emit('error', "no such room with id #{req.roomId}")
            return

          # Add user to room.
          room.addUser(user)

          # Set room (or room ID) to socket
          socket.set('room', room)
          socket.join(room.id)

          # Inform everyone that someone joined the room. Serves double-duty to provide the current
          # room state to the new member.
          sockets.in(room.id).emit('roomUpdated', room.sanitized())

      ##
      # Submit an estimate to the room.
      #
      # @param {Estimate} estimate
      socket.on 'submitEstimate', (estimate) =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not associate user with user')
            return

          socket.get 'room', (error, room) =>
            if error? or !room?
              socket.emit('error', 'could not associate room with user')
              return

            estimate = Estimate.valueOf(estimate)

            unless estimate.isValid()
              socket.emit('error', 'estimate invalid', estimate)
              return

            console.log("Room #{room.id} received estimate from User #{user.id}:", estimate)

            # Set the user's estimate in this room.
            # If this changed the user's estimate, broadcast that to everyone else.
            if room.setEstimate(user, estimate)
              sockets.in(room.id).emit('roomUpdated', room.sanitized())

      ##
      # Reveal estimates to members of the room.
      socket.on 'showEstimates', =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not associate user with user')
            return

          socket.get 'room', (error, room) =>
            if error? or !room?
              socket.emit('error', 'could not associate room with user')
              return

            # Verify that the user owns the room.
            # Toggle the estimate visibility to visible.
            if room.isOwnedBy(user)
              room.isRevealed = true

              # Broadcast the revealed room to everyone.
              sockets.in(room.id).emit('roomUpdated', room.sanitized())

      ##
      # Conceal everyone's estimates. And I guess hope they have the memory of a goldfish and no
      # logging enabled. Included for completeness, I guess?
      socket.on 'hideEstimates', =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not associate user with user')
            return

          socket.get 'room', (error, room) =>
            if error? or !room?
              socket.emit('error', 'could not associate room with user')
              return

            # Verify that the user owns the room.
            # Toggle the estimate visibility to concealed.
            # Update everyone about the new room state.
            if room.isOwnedBy(user)
              room.isRevealed = false

              # Broadcast the revised room state.
              sockets.in(room.id).emit('roomUpdated', room.sanitized())

      ##
      # Clear the current estimates.
      socket.on 'clearEstimates', =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not associate user with user')
            return

          socket.get 'room', (error, room) =>
            if error? or !room?
              socket.emit('error', 'could not associate room with user')
              return

            # Verify that the user owns the room.
            # Clear the room estimates.
            # Broadcast the updated room state.
            if room.isOwnedBy(user)
              room.clearEstimates()
              sockets.in(room.id).emit('roomUpdated', room.sanitized())

      socket.on 'disconnect', =>
        socket.get 'user', (error, user) =>
          if error? or !user?
            socket.emit('error', 'could not associate user with user')
            return

          socket.get 'room', (error, room) =>
            if error? or !room?
              socket.emit('error', 'could not associate room with user')
              return

            console.log("Removing User #{user?.id} from Room #{room?.id}")
            room.removeUser(user)
            sockets.in(room.id).emit('roomUpdated', room.sanitized())

module.exports = Pokey
