// TODO Implement
// Provides an Angular service to handle user registration.
// isRegistered(): boolean - check if we are currently registered
// getName(): string - gets the value of the name cookie, or null if not set
// register(name: string=undefined) - register. If no name is specified, pass in the name cookie
//                                    value
define(function() {
  'use strict';

  var PokeyService = function(socket, sessionId) {
    this.socket = socket;
    this.sessionId = sessionId;
  };

  PokeyService.prototype.register = function(name) {
    this.socket.emit('register', {
      sessionId: this.sessionId,
      name: name
    });
  };

  PokeyService.prototype.createRoom = function() {
    this.socket.emit('createRoom');
  };

  PokeyService.prototype.joinRoom = function(roomId) {
    this.socket.emit('joinRoom', {
      roomId: roomId
    });
  };

  PokeyService.prototype.submitEstimate = function(estimate) {
    this.socket.emit('submitEstimate', estimate);
  };

  return PokeyService;
});
