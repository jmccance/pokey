class Room
  @nextId = 0
  @rooms = {}

  @add: (room) ->
    # TODO Test if room is a Room
    id = room.id = @nextId
    @rooms[id] = room
    @nextId += 1
    return room

  @get: (id) -> @rooms[id]

  @all: -> room for id, room of @rooms

  @delete: (id) -> delete @rooms[id]

  constructor: (@owner) ->
    # Map of user IDs to estimates. Estimates are null if not submitted yet.
    # TODO Want to efficiently send both ID and name to client.
    # May make sense to instead have an array of objects with a 'user' key and
    # and 'estimate' key.
    @id = null
    @estimates = {}
    @isRevealed = false

  isOwnedBy: (user) -> user.id == @owner.id

  ##
  # Add the specified user to the room. No-op if a user with that ID is already in the room.
  addUser: (user) ->

  ##
  # Set a user's estimate for the current task.
  setEstimate: (user, estimate) ->

  ##
  # Unset everyone's estimates.
  clearEstimates: ->

  ##
  # Serialize the room. Hides everyone's estimates if they have not been revealed yet.
  #
  # Note: Might make more sense to change this to return an object and use Express's method for
  # sending JSON.
  #
  # @returns {string} the room, serialized to JSON, concealing estimates if appropriate
  toJSON: ->

module.exports = Room
