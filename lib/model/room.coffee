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

  constructor: (@name, @owner) ->
    # Map of user IDs to estimates. Estimates are null if not submitted yet.
    # TODO Want to efficiently send both ID and name to client.
    # May make sense to instead have an array of objects with a 'user' key and
    # and 'estimate' key.
    @estimates = @owner.id: null

module.exports = Room
