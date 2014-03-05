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
    @id = null

    # Users and their estimates are stored as a Map.<userId, {user: User, estimate: Estimate}>.
    @members = {}
    @isRevealed = false

  isOwnedBy: (user) -> user.id == @owner.id

  ##
  # Add the specified user to the room. No-op if a user with that ID is already in the room.
  addUser: (user) ->
    if !@members[user.id]?
      @members[user.id] =
        user: user
        estimate: null

  ##
  # Remove a user from the room.
  removeUser: (user) -> delete @members[user.id]

  ##
  # Set a user's estimate for the current task.
  setEstimate: (user, estimate) -> @members[user.id].estimate = estimate

  ##
  # Unset everyone's estimates.
  clearEstimates: -> @members[userId].estimate = null for userId of @members

  ##
  # Serialize the room. Hides everyone's estimates if they have not been revealed yet.
  #
  # @returns {string} the room, serialized to JSON, concealing estimates if appropriate
  toJSON: ->
    jsonObject =
      id: @id
      isRevealed: @isRevealed

    # Function to censor an estimate. Unsubmitted estimates are null, submitted estimates are an
    # empty object: truthy, but unrevealing.
    censored = (estimate) -> if estimate? then {} else null

    for userId, value of @members
      jsonObject[userId] =
        user: value.user
        estimate: if @isRevealed then value.estimate else censored(value.estimate)

    return JSON.stringify(jsonObject)

module.exports = Room
