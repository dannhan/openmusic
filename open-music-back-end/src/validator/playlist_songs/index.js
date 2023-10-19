const { PlaylistSongValidationSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PlaylistSongsValidator = {
  validatePlaylistSongPayload: (payload) => {
    const { error } = PlaylistSongValidationSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
