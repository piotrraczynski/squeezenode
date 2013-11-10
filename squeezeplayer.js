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
var SqueezeRequest = require('./squeezerequest');

function SqueezePlayer(playerId, address, port) {
    this.playerId = playerId;
    SqueezePlayer.super_.apply(this, [address, port]);

    this.clearPlayList = function (callback) {
        this.request(playerId, ["playlist", "clear"], callback);
    }

    this.getMode = function (callback) {
        this.request(playerId, ["mode", "?"], callback);
    }

    this.setName = function (name, callback) {

    }

    this.getPlaylist = function (from, to, callback) {
        this.request(playerId, ["status", from, to], function (reply) {
            if (reply.ok)
                reply.result = reply.result.playlist_loop;
            callback(reply);
        });
    }

    this.getCurrentTitle = function (callback) {
        this.request(playerId, ["current_title", "?"], callback);
    }

    this.getStatus = function (callback) {
        this.request(playerId, ["status"], callback);
    }
}

util.inherits(SqueezePlayer, SqueezeRequest);

module.exports = SqueezePlayer;


