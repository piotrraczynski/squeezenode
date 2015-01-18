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

var jayson = require('jayson');
var inherits = require('super');

function SqueezeRequest(address, port) {
    this.address = (address !== undefined) ? address : "localhost";
    this.port = (port !== undefined) ? port : 9000;
    var jsonrpc = this.address + ':' + this.port + '/jsonrpc.js';
    var client = jayson.client.http(jsonrpc);
    client.options.version = 1;

    function handle(err, reply, callback) {
        var result = {};
        if (err) {
            result = err;
            result.ok = false;
        }
        else {
            result = reply;
            result.ok = true;
        }
        if (callback)
            callback(result);
    }

    this.request = function (player, params, callback) {
        var finalParams = [];
        finalParams.push(player);
        finalParams.push(params);
        client.request('slim.request', finalParams, null, function (err, reply) {
            handle(err, reply, callback);
        });
    };
}

module.exports = SqueezeRequest;
