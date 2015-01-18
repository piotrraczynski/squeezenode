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

All API requests returns reply in a callback. Each reply contains 'ok' bool variable which is true if request
has been processed properly, false otherwise and 'result' property with the request result.

Demo App
--------

Inside Demo folder there is a simple demo application with interactive shell that shows squeezenode
functionality (at least some portion of it especially Spotify API), refer to demo's README for more details/

Spotify Examples
----------------

Squeezenode supports Triode's Spotify (premium users only) plugin, therefore allows to play spotify based playlists and songs. Below are a few examples of using Squeezenode with Spotify.
In order to use squeezenode and Spotify you need to have Triode's Spotify plugin enabled in Logitech Media Server settings and configured.

First verify that you can play Spotify music using standard web GUI, if it's working, you're ready to go.

Let's assume you'd like to play 'The Fixer' performed by Pearl Jam with player 'testPlayer'.

    var SqueezeServer = require('squeezenode');
    var squeeze = new SqueezeServer('http://192.168.0.10', 9000);

    /*
    *
    * This example shows how to play specific song (in this case The Fixer by Pearl Jam
    * with player testPlayer
    *
    */

    /* helper function*/
    function playerIdByName(name, callback) {
        var found = false;
        squeeze.getPlayers( function(reply) {
            for (var id in reply.result) {
                if(reply.result[id].name === name) {
                    found = true;
                    callback ({ok: true, playerId: reply.result[id].playerid});
                }
            }
            if (!found)
                callback ({ok: false});
        });
    }

    squeeze.on('register', function(){
        //we only need a couple (5) of search results
        squeeze.apps.spotify.searchTracks('The fixer', 0, 5, function (reply) {
            if (reply.ok) {
            console.log ('we found song named: %s written by %s, with spotifyUri: %s',
                reply.result.tracks[0].name,
                reply.result.tracks[0].artists[0].name,
                reply.result.tracks[0].uri);
                //Now let's play the song with our player
                playerIdByName('testPlayer', function (pl) {
                    if (reply.ok) {
                        squeeze.apps.spotify.loadToPlaylist(reply.result.tracks[0].uri, pl.playerId, function (reply) {
                            if (!reply.ok) {
                                console.dir (reply);
                            }
                            //if needed, let's adjust the volume
                            squeeze.players[pl.playerId].setVolume(40);
                            //Enjoy listening
                        });
                    }
                });
            }
        });
    });

TODO
----

* Better documentation
* Add full API description
* Add wiki