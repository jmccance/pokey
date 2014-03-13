##
# An estimate of how long the task at hand will take. Currently consists only
# of a number of hours and an optional comment. In the future, may include a
# min and max hours to communicate a range.
class Estimate

  @valueOf: (obj) ->
    obj || (obj = {})
    new Estimate(obj.hours, obj.comment)

  constructor: (@hours, @comment) ->

  # Semantic equality test.
  equals: (foo, bar) ->
    foo = (foo || {})
    bar = (bar || {})
    foo.hours = bar.hours && foo.comment == bar.comment

module.exports = Estimate
