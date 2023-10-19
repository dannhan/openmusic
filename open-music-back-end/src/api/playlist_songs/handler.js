class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, songsService, activitiesService, validator) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._songsService = songsService;
    this._activitiesService = activitiesService;
    this._validator = validator;
  }

  async postPlaylistSongHandler(request, h) {
    await this._validator.validatePlaylistSongPayload(request.payload);

    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { userId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    await this._playlistSongsService.addPlaylistSong(songId, playlistId);

    const action = 'add';
    await this._activitiesService.addActivity(playlistId, songId, userId, action);

    return h
      .response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke dalam playlist',
      })
      .code(201);
  }

  async getPlaylistSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const songs = await this._playlistSongsService.getPlaylistSongsByPlaylistId(playlistId);
    playlist.songs = songs;

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongHandler(request) {
    await this._validator.validatePlaylistSongPayload(request.payload);

    const { userId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    await this._playlistSongsService.deletePlaylistSong(playlistId, songId);

    const action = 'delete';
    await this._activitiesService.addActivity(playlistId, songId, userId, action);

    return {
      status: 'success',
      message: 'Lagu telah dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
