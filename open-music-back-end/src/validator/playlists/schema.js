const Joi = require('joi');

const PlaylistValidationSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PlaylistValidationSchema };
