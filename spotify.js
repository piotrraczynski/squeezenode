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

var inherits = require('super');
var SqueezeApp = require('./squeezeapp');

function Spotify(defPlayerId, name, cmd, address, port) {
    Spotify.super_.apply(this, arguments);

    this.search = function (search, callback) {
        this.request(this.defPlayerId, ["spotify", "items", 0, 100, "item_id:8", "search:" + search], callback);
    }

    this.getItemId = function (itemId, callback) {
        this.request(this.defPlayerId, ["spotify", "items", 0, 100, "item_id:" + itemId], callback);
    }

    this.getItemIdDetails = function (itemId, callback) {
        this.request(this.defPlayerId, ["spotify", "items", 0, 100, "menu:1", "item_id:" + itemId], callback);
    }

    this.addToPlaylist = function (itemURI, playerId, callback) {
        this.request(playerId, ["spotifyplcmd", "cmd:add", "uri:" + itemURI], callback);
    }

    this.play = function (item, playerId, callback) {
        this.request(playerId, ["spotifyplcmd", "cmd:load", "uri:" + itemURI], callback);
    }
}

inherits(Spotify, SqueezeApp);

module.exports = Spotify;