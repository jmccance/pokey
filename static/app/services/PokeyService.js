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
    this.username = undefined;
  };

  // API Calls ////////////////////////

  // TODO Implement promise-based API.
  // Call-and-response calls should return a promise. These methods include register, joinRoom, createRoom. "Command"
  // messages like "clearEstimates" or "submitEstimate" don't need this.
  //
  // Q supports a timeout, so if we don't get back the expected event within a certain interval we can fail the
  // request. Note that the timeout method is on the promise, so we'll return something like
  //
  //     deferred.promise.timeout(TIMEOUT)

  // TODO Implement bean-based listening
  // We also need listeners. We've implemented a primitive listener system below but... I don't like it much. Consider
  // pulling in the "bean" library for event handling, but fronting it here. E.g,:
  //
  //     _.each(['on', 'one', 'off'], function(method) {
  //       PokeyService.prototype[method] = function() {
  //         arguments.unshift(this);
  //         bean[method].apply(arguments);
  //       };
  //     });
  //
  // Minified Bean is 10.052kb, so no biggie.

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

  /**
   * @param {string} roomId
   */
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

  PokeyService.prototype.isRegistered = function () {
    return this.username !== undefined;
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
