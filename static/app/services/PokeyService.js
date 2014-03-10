define(function() {
  'use strict';

  var PokeyService = function (sessionId, socket) {
    this.socket = socket;
    this.sessionId = sessionId;
  };

  // API Calls ////////////////////////

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
