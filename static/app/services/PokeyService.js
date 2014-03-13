define([
  'bean',
  'Q',
  'underscore'
], function (
    bean,
    Q,
    _
    ) {
  'use strict';

  var PokeyService = function (sessionId, socket) {
    var self = this;

    this.socket = socket;
    this.sessionId = sessionId;
    this.user = undefined;

    socket.on('registered', function (user) {
      console.log('Registered:', user);
      self.user = user;
      self.fire('registered', user);
    });

    socket.on('roomCreated', function (room) {
      console.log('roomCreated:', room);
      self.fire('roomCreated', room);
    } )
    socket.on('roomUpdated', function (room) {
      self.fire('roomUpdated', room);
    })
  };

  // Delegate the event handler methods to bean.
  _.each(['on', 'one', 'off', 'fire'], function (method) {
    PokeyService.prototype[method] = function () {
      Array.prototype.unshift.call(arguments, this);
      bean[method].apply(undefined, arguments);
    };
  });

  PokeyService.prototype.register = function (name) {
    var req = {
      sessionId: this.sessionId,
      name: name
    };

    console.log('Registering:', req);
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
    console.log('Submitting estimate:', estimate);
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
    return this.user !== undefined;
  };

  PokeyService.prototype.getUser = function () {
    return this.user;
  };

  return PokeyService;
});
