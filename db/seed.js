import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO: create the tracks
  for (let i = 1; i <= 20; i++) {
    await db.query(`INSERT INTO tracks (name, duration_ms) VALUES ($1, $2)`, [
      `Track ${i}`,
      180000 + i * 1000,
    ]);
  }

  // Create playlists
  for (let i = 1; i <= 10; i++) {
    await db.query(
      `INSERT INTO playlists (name, description) VALUES ($1, $2)`,
      [`Playlist ${i}`, `Description for playlist ${i}`]
    );
  }

  // Associate tracks with playlists
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackId = 1 + Math.floor(Math.random() * 20);

    try {
      await db.query(
        `INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2)`,
        [playlistId, trackId]
      );
    } catch (err) {
      // Ignore unique constraint errors to avoid duplicates
      if (err.code !== "23505") throw err;
    }
  }
}
