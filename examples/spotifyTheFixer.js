var SqueezeServer = require('squeezenode');
var squeeze = new SqueezeServer('http://192.168.0.10', 9000);

/*
 * This example shows how to play specific song (in this case The Fixer by Pearl Jam
 * with player testPlayer
 * */

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
            //Verify above result since Spotify database can change over time
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