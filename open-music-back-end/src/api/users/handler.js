class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    await this._validator.validateUserPayload(request.payload);

    const { username, password, fullname } = request.payload;
    const userId = await this._service.addUser({ username, password, fullname });

    return h
      .response({
        status: 'success',
        data: {
          userId,
        },
      })
      .code(201);
  }
}

module.exports = UsersHandler;
