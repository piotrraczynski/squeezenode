/**
 * Created by praczyns on 11/12/13.
 */

var util = require('util');
var SqueezeApp = require('./squeezeapp');

function Spotify(name, cmd, address, port) {
    Spotify.super_.apply(this, arguments);
}

util.inherits(Spotify, SqueezeApp);

module.exports = Spotify;