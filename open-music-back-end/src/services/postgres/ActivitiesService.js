const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class ActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity(playlistId, songId, userId, action) {
    const time = new Date().toISOString();
    const id = `activity-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_song_activities values($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, action, time],
    };
    await this._pool.query(query);
  }

  async getPlaylistSongActivities(id) {
    const query = {
      text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
        FROM playlist_song_activities
        LEFT JOIN songs ON songs.id = playlist_song_activities.song_id
        LEFT JOIN users ON users.id = playlist_song_activities.user_id
        WHERE playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = ActivitiesService;
