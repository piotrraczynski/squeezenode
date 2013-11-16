squeezenode
===========

Squeezenode is a Node.js wrapper library for Logitech Media Server (Squeezebox) CLI/json interface with Spotify/SoundCloud support


How To Use
----------

To use this library, make sure Squeezebox (Logitech Media Server) server is up and running.

Note that default port for LMS server is port 9000 (you can change it under settings.

To start using te library instantiate the SqueezeServer class, eg.

    var SqueezeServer = require('squeezenode');
    var squeeze = new SqueezeServer('http://localhost', 9000);
    //subscribe for the 'register' event to ensure player registration is complete

    squeeze.on('register', function(){
        //you're ready to use the api, eg.
        squeeze.getPlayers( function(reply) {
                console.dir(reply);
        });
    });

All api requests returns reply in a callback. Each reply contains 'ok' bool variable which is true if request
has been processed properly, false otherwise and 'result' property with the reqeust result.


