const Joi = require('joi');

const PlaylistSongValidationSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistSongValidationSchema };
