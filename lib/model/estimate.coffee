##
# An estimate of how long the task at hand will take. Currently consists only
# of a number of hours and an optional comment. In the future, may include a
# min and max hours to communicate a range.
class Estimate
  constructor: (@hours, @comment) ->

module.exports = Estimate