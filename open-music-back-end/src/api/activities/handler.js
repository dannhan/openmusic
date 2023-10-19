class ActivitiesHandler {
  constructor(activitiesService, playlistsService) {
    this._activitiesService = activitiesService;
    this._playlistsService = playlistsService;
  }

  async getPlaylistSongActivitiesHandler(request) {
    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;

    await this._playlistsService.getPlaylistById(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    let activities = await this._activitiesService.getPlaylistSongActivities(playlistId);
    activities = activities.sort((a, b) => new Date(a.time) - new Date(b.time));

    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = ActivitiesHandler;
