class User
  @nextId = 0
  @users = {}

  @add: (user) ->
    # TODO Test if user is a User
    id = user.id = @nextId
    @users[id] = user
    @nextId += 1
    return user

  @get: (id) -> @users[id]

  @all: -> user for id, user of @users

  @delete: (id) -> delete @users[id]

  constructor: (@name) ->
    @id = null
    @estimate = null

module.exports = User
