class Room
  @nextId = 0
  @rooms = {}

  @add: (room) ->
    # TODO Test if room is a Room
    id = room.id = @nextId
    @rooms[id] = room
    @nextId += 1
    console.log('Adding room', room)
    return room

  @get: (id) -> @rooms[id]

  @all: -> room for id, room of @rooms

  @delete: (id) -> delete @rooms[id]

  constructor: (@owner) ->
    @id = null
    @members = {}
    @isRevealed = false

  isOwnedBy: (user) -> user.id == @owner.id

  contains: (user) -> @members[user.id]?

  ##
  # Add the specified user to the room. No-op if a user with that ID is already in the room.
  addUser: (user) ->
    console.log('Adding user', user)
    @members[user.id] = user unless @members[user.id]?

  ##
  # Remove a user from the room.
  #
  # @returns {boolean} true iff a user was removed
  removeUser: (user) ->
    console.log('Removing user', user)
    isMember = @contains(user)
    delete @members[user.id]
    return isMember

  ##
  # Set a user's estimate for the current task.
  #
  # @returns {boolean} true iff the estimate changed
  setEstimate: (user, estimate) ->
    isEstimateChanging = !(estimate.equals(@members[user.id].estimate))
    @members[user.id].estimate = estimate

    return isEstimateChanging

  ##
  # Unset everyone's estimates.
  clearEstimates: ->
    console.log('Room #{@id}: Clearing estimates')
    for id, user of @members
      user.estimate = null

  ##
  # Serialize the room. Hides everyone's estimates if they have not been revealed yet.
  #
  # @returns {string} the room, serialized to JSON, concealing estimates if appropriate
  sanitized: ->
    clone =
      id: @id
      owner: @owner
      isRevealed: @isRevealed
      members: @members

    # Function to censor an estimate. Unsubmitted estimates are null, submitted estimates are an
    # empty object: truthy, but unrevealing.
    censored = (estimate) -> if estimate? then {} else null

    for userId, value of clone.members
      value.estimate = if @isRevealed then value.estimate else censored(value.estimate)

    return clone

module.exports = Room
