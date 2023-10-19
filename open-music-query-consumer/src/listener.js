class Listener {
  constructor(playlistSongsService, playlistsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistSongs = await this._playlistSongsService.getPlaylistSongs(playlistId);
      const playlist = await this._playlistsService.getPlaylist(playlistId);
      playlist.songs = playlistSongs;

      const data = { playlist };
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
