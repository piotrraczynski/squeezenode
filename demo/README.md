squeezenode demo app
===========

This is a demo application to show squeezenode functionality in an interactive CLI environment.

How To Use
----------

First make sure  you've executed 'npm install' in squeezenode directory to satisfy all its dependencies.
Then install this demo app with the same command in this directory.

Usage: node demo.js [options]

Options:
   -u, --url    Logitech Media Server url address. eg. http://192.168.0.10
   -p, --port   Logitech Media Server port  [9000]

When you specify correct parameters as above, after squeezenode connects to the server,
interactive shell is started. Type help [enter] to get list of commands. Go through the code to see
which calls are getting executed.

For specific command help type 'command help', eg. spotifySearch help [enter]

Some examples:

    SpotifySearchAlbums Damnation [enter]

    SpotifySearchTracks Fixer [enter]

    SpotifySearchArtists Knopfler [enter]

When you explore results of those commands, you will se their URIs, then you can use commands like spotifyAdd
to add those results to the playlist eg.

    spotifyAdd testPlayer URI_FROM_SEARCH add

Then if you want to play it

    play testPlayer

It is useful to open LMS GUI and observe results of executed commands.
