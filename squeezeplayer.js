/*
 The MIT License (MIT)
 Copyright (c) 2013-2015 Piotr Raczynski, pio[dot]raczynski[at]gmail[dot]com
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

var inherits = require('super');
var SqueezeRequest = require('./squeezerequest');

function SqueezePlayer(playerId, name, address, port) {
    this.playerId = playerId;
    this.name = name;

    SqueezePlayer.super_.apply(this, [address, port]);

    this.clearPlayList = function (callback) {
        this.request(playerId, ["playlist", "clear"], callback);
    };

    this.getMode = function (callback) {
        this.request(playerId, ["mode", "?"], callback);
    };

    this.setName = function (name, callback) {
        this.request(playerId, ["name", name], callback);
    };

    this.getName = function (callback) {
        this.request(playerId, ["name", "?"], callback);
    };

    this.getCurrentTitle = function (callback) {
        this.request(playerId, ["current_title", "?"], function (reply) {
            if (reply.ok)
                reply.result = reply.result._current_title;
            callback(reply);
        });
    };

    this.getArtist = function (callback) {
        this.request(playerId, ["artist", "?"], function (reply) {
            if (reply.ok)
                reply.result = reply.result._artist;
            callback(reply);
        });
    };

    this.getAlbum = function (callback) {
        this.request(playerId, ["album", "?"], function (reply) {
            if (reply.ok)
                reply.result = reply.result._album;
            callback(reply);
        });
    };

    this.getCurrentRemoteMeta = function (callback) {
        this.request(playerId, ["status"], function (reply) {
            if (reply.ok)
                reply.result = reply.result.remoteMeta;
            callback(reply);
        });
    };

    this.getStatus = function (callback) {
        this.request(playerId, ["status"], callback);
    };

    this.getStatusWithPlaylist = function (from, to, callback) {
        this.request(playerId, ["status", from, to], function (reply) {
            if (reply.ok)
                reply.result = reply.result;
            callback(reply);
        });
    };

    this.getPlaylist = function (from, to, callback) {
        this.request(playerId, ["status", from, to], function (reply) {
            if (reply.ok)
                reply.result = reply.result.playlist_loop;
            callback(reply);
        });
    };

    this.play = function (callback) {
        this.request(playerId, ["play"], callback);
    };

    this.playIndex = function (index, callback) {
        console.log("index: " + index);
        this.request(playerId, ["playlist", "index", index], callback);
    };

    this.pause = function (callback) {
        this.request(playerId, ["pause"], callback);
    };

    this.next = function (callback) {
        this.request(playerId, ["button", "jump_rew"], callback);
    };

    this.previous = function (callback) {
        this.request(playerId, ["button", "jump_rew"], callback);
    };

    this.next = function (callback) {
        this.request(playerId, ["button", "jump_fwd"], callback);
    };

    this.playlistDelete = function(index, callback) {
        this.request(playerId, ["playlist", "delete", index], callback);
    };

    this.playlistMove = function(fromIndex, toIndex, callback) {
        this.request(playerId, ["playlist", "move", fromIndex, toIndex], callback);
    };

    this.playlistSave = function(playlistName, callback) {
        this.request(playerId, ["playlist", "save", playlistName], callback);
    };

    this.sync = function(syncTo, callback) {
        this.request(playerId, ["sync", syncTo], callback);
    };

    this.unSync = function(callback) {
        this.request(playerId, ["sync", "-"], callback);
    };

    this.seek = function(seconds, callback) {
        this.request(playerId, ["time", seconds], callback);
    };

    this.setVolume = function(volume, callback) {
        this.request(playerId, ["mixer", "volume", volume], callback);
    };

    this.getVolume = function(callback) {
        this.request(playerId, ["mixer", "volume", "?"], function(reply) {
          if (reply.ok)
              reply.result = reply.result._volume;
          callback(reply);
        });
    };

    this.playFavorite = function (favorite, callback) {
        this.request(playerId, ["favorites", "playlist", "play", "item_id:" + favorite], callback);
    };

    this.playRandom = function(target, callback) {
        this.request(playerId, ["randomplay", target], callback);
    };
    this.power = function(state, callback) {
        this.request(playerId, ["power", state], callback);
    };

    //to append song url (path)/playlist or directory content to end of the playlist
    this.addToPlaylist = function (item, callback) {
        this.request(playerId, ["playlist", "add", item], callback);
    };

    //to insert song url (path)/playlist or directory content after currently playing track
    this.insertToPlaylist = function (item, callback) {
        this.request(playerId, ["playlist", "insert", item], callback);
    };
}

inherits(SqueezePlayer, SqueezeRequest);

module.exports = SqueezePlayer;
