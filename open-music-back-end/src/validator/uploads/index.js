const InvariantError = require('../../exceptions/InvariantError');
const { CoverAlbumPayloadSchema } = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const { error } = CoverAlbumPayloadSchema.validate(headers);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = UploadsValidator;
