/*
 The MIT License (MIT)

 Copyright (c) 2013 Piotr Raczynski, pio[dot]raczynski[at]gmail[dot]com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

var util = require('util');
var SqueezeRequest  = require('./squeezerequest');
var SqueezePlayer   = require('./squeezeplayer');

function SqueezeServer (address, port) {
    SqueezeServer.super_.apply(this, arguments);
    var defaultPlayer = "00:00:00:00:00:00";
    var self = this;
    this.players = [];
    this.playerUpdateInterval = 2000;

    this.getPlayerCount = function(callback)
    {
        this.request(defaultPlayer, ["player", "count", "?"], callback);
    }

    this.getStatus = function(callback)
    {
        this.request(defaultPlayer, ["version", "?"], callback);
    }

    this.getPlayers = function(callback) {
        this.request(defaultPlayer, ["players", 0, 100], callback);
    }

    this.getPlayerId = function(id, callback) {
        this.request(defaultPlayer, ["player", "id", id, "?"], callback);
    }

    this.getPlayerIp = function(playerId, callback) {
        this.request(defaultPlayer, ["player", "ip", playerId, "?"], callback);
    }

    this.getPlayerName = function(playerId, callback) {
        this.request(defaultPlayer, ["player", "name", playerId, "?"], callback);
    }

    this.getSyncGroups = function(callback) {
        this.request(defaultPlayer, ["syncgroups", "?"], callback);
    }

    setInterval(function() {
        self.getPlayers(function(reply) {
            var players = reply.result.players_loop;
            for (var pl in players) {
                if (!self.players[players[pl].playerid]) { // player not on the list
                    self.players[players[pl].playerid] =
                        new SqueezePlayer(players[pl].playerid, self.address, self.port);
                }
            }
        }
        )
    }, this.playerUpdateInterval);
}

util.inherits(SqueezeServer, SqueezeRequest);

module.exports = SqueezeServer;
