const routes = require('./routes');
const PlaylistsHandler = require('./handler');

module.exports = {
  name: 'playlistsSongs',
  version: '1.0.0',
  register: (server, {
    playlistSongsService,
    playlistsService,
    songsService,
    activitiesService,
    validator,
  }) => {
    const playlistsHandler = new PlaylistsHandler(
      playlistSongsService,
      playlistsService,
      songsService,
      activitiesService,
      validator,
    );

    server.route(routes(playlistsHandler));
  },
};
