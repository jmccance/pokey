define([
  'q',
  'underscore'
], function (
    q,
    _
    ) {
  'use strict';

  var PokeyService = function (sessionId, socket) {
    this.socket = socket;
    this.sessionId = sessionId;
  };

  // API Calls ////////////////////////

  // TODO Implement promise-based API.
  // All event-emitting calls should return a promise.

  PokeyService.prototype.register = function (name) {
    var req = {
      sessionId: this.sessionId,
      name: name
    };

    console.log('Registering', req);
    this.socket.emit('register', req);
  };

  PokeyService.prototype.createRoom = function () {
    this.socket.emit('createRoom');
  };

  PokeyService.prototype.joinRoom = function (roomId) {
    this.socket.emit('joinRoom', {
      roomId: roomId
    });
  };

  PokeyService.prototype.submitEstimate = function (estimate) {
    this.socket.emit('submitEstimate', estimate);
  };

  PokeyService.prototype.showEstimates = function () {
    this.socket.emit('showEstimates');
  };

  PokeyService.prototype.hideEstimates = function () {
    this.socket.emit('hideEstimates');
  };

  PokeyService.prototype.clearEstimates = function () {
    this.socket.emit('clearEstimates');
  };

  /**
   * Set up event handlers for Pokey events. Currently just acts as a go-between for the socket.
   *
   * @param {string} event
   * @param {function} callback
   */
  PokeyService.prototype.on = function (event, callback) {
    if (_.isFunction(callback)) {
      this.socket.on(event, function () {
        callback.apply(arguments);
      });
    } else {
      console.log('Ignoring attempt to add event handler with a non-function callback.');
    }
  };

  PokeyService.prototype.off = function (event, callback) {
    this.socket.removeListener(event, callback);
  };

  return PokeyService;
});
