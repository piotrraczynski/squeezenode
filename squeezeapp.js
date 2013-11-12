/**
 * Created by praczyns on 11/12/13.
 */

var util = require('util');
var SqueezeRequest = require('./squeezerequest');

function SqueezeApp(name, cmd, address, port) {
    this.Appname = name;
    this.cmd = cmd;
    SqueezeApp.super_.apply(this, [address, port]);

    this.getStatus = function (callback) {
        this.request(playerId, ["status"], callback);
    }
}

util.inherits(SqueezeApp, SqueezeRequest);

module.exports = SqueezeApp;
