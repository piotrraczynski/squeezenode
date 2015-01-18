var squeezenode = require('../');
var celeri = require('celeri');var options = require('./options');
var package = require('./package.json');

console.log(package.name.green + ' by ' + 'Piotr Raczynski'.green);

var squeeze = new squeezenode(options.opts.url, options.opts.port);

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
        celeri.option({
            command: 'spotifySearchTracks :query',
            description: 'Performs spotify tracks search'
        }, function (data) {
            squeeze.apps.spotify.searchTracks(data.query, 0, 20, function (reply) {
                if (reply.ok)
                    console.dir(reply.result);
            });
        });

        celeri.option({
            command: 'spotifySearchAlbums :query',
            description: 'Performs spotify albums search'
        }, function (data) {
            squeeze.apps.spotify.searchAlbums(data.query, 0, 20, function (reply) {
                if (reply.ok)
                    console.dir(reply.result);
            });
        });

        celeri.option({
            command: 'spotifySearchArtists :query',
            description: 'Performs spotify artists search'
        }, function (data) {
            squeeze.apps.spotify.searchArtists(data.query, 0, 20, function (reply) {
                if (reply.ok)
                    console.dir(reply.result);
            });
        });

        celeri.option({
            command: 'spotifySearch :query',
            description: 'Performs spotify general search'
        }, function (data) {
            squeeze.apps.spotify.searchAll(data.query, 0, 20, function (reply) {
                if (reply.ok)
                    console.dir(reply.result);
            });
        });

        celeri.option({
            command: 'players',
            description: 'Prints LMS players'
        }, function () {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    console.dir(reply.result);
            });
        });

        celeri.option({
            command: 'spotifyAdd :playerName :spotifyUri :add_or_replace',
            description: "Adds a spotify item (album, track) to specified player playlist, specify add/replace as the last parameter to either append to or replace current playlist"
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok) {
                    playerIdByName(data.playerName, function (pl) {
                        if (data.add_or_replace === "replace") {
                            squeeze.apps.spotify.loadToPlaylist(data.spotifyUri, pl.playerId, function(loadReply) {
                                if (!loadReply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        } else {
                            squeeze.apps.spotify.addToPlaylist(data.spotifyUri, pl.playerId, function(loadReply) {
                                if (!loadReply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });

                }
            });
        });

        celeri.option({
            command: 'volume :playerName :volume',
            description: 'Sets player volume [0-100]'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].setVolume(data.volume, function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        };
                    });
            });
        });

        celeri.option({
            command: 'playlist :playerName',
            description: 'Prints current playlist of specified player'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].getPlaylist(0, 100, function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                                else {
                                    console.dir (reply.result);
                                }
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'play :playerName',
            description: 'start playing with specified player'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].play(function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'pause :playerName',
            description: 'pause playing with specified player'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].pause(function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'next :playerName',
            description: 'play next song in the playlist'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].next(function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'prev :playerName',
            description: 'play next song in the playlist'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].previous(function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'seek :playerName :second',
            description: 'goes to specified second of current song'
        }, function (data) {
            squeeze.getPlayers( function(reply) {
                if (reply.ok)
                    playerIdByName(data.playerName, function (pl) {
                        if (!pl.ok)
                            console.log ('Error occured! Specified player does not exist'.red);
                        else {
                            squeeze.players[pl.playerId].seek(data.second, function (reply){
                                if (!reply.ok)
                                    console.log ('Error occured!'.red);
                            });
                        }
                    });
            });
        });

        celeri.option({
            command: 'exit',
            description: 'Exit application'
        }, function () {
            process.exit(0);
        });

        celeri.open(); /* start interactive shell, type help command for help :)*/
});
