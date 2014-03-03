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

module.exports = Room
