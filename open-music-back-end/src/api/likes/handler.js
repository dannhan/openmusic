class LikesHandler {
  constructor(likesService, albumsService) {
    this._likesService = likesService;
    this._albumsService = albumsService;
  }

  async postLikeHandler(request, h) {
    const { userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.getAlbumById(albumId);
    await this._likesService.addLike(userId, albumId);

    return h
      .response({
        status: 'success',
        message: 'Album berhasil disukai',
      })
      .code(201);
  }

  async deleteLikeHandler(request, h) {
    const { userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._likesService.deleteLike(userId, albumId);

    return h
      .response({
        status: 'success',
        message: 'Album batal disukai',
      })
      .code(200);
  }

  async getLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const { likes, source } = await this._likesService.getLikes(albumId, h);

    // if (source === 'Cache') h.response().header('X-Data-Source', 'Cache');
    return h
      .response({
        status: 'success',
        data: {
          likes,
        },
      })
      .header('X-Data-Source', source)
      .code(200);
  }
}

module.exports = LikesHandler;
