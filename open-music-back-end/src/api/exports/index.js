const ExportPlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { ProducerService, playlistsService, validator }) => {
    const exportPlaylistsHandler = new ExportPlaylistsHandler(
      ProducerService,
      playlistsService,
      validator,
    );
    server.route(routes(exportPlaylistsHandler));
  },
};
