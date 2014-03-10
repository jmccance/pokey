define(function() {
  'use strict';

  var PokeyService = function (sessionId, socket) {
    this.socket = socket;
    this.sessionId = sessionId;
  };

  // API Calls ////////////////////////

  // TODO Implement promise-based API.
  // All event-emitting calls should return a promise.

  // TODO Implement listening.
  // For events we expect to be receive from the server, provide a listener system. For example,
  // RoomCtrl will want to be able to listen for 'roomUpdated' events so that it can update its
  // display.

  PokeyService.prototype.register = function (name) {
    var req = {
      sessionId: this.sessionId,
      name: name
    };

    console.log('Registering', req);
    this.socket.emit('register', req);
  };

  PokeyService.prototype.createRoom = function() {
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

  return PokeyService;
});
