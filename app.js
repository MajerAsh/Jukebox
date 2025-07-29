// routes/tracks.js
import express from "express";
const router = express.Router();
import db from "#db/client";

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM tracks");
  res.send(rows);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid track ID");

  const { rows } = await db.query("SELECT * FROM tracks WHERE id = $1", [id]);
  if (rows.length === 0) return res.status(404).send("Track not found");
  res.send(rows[0]);
});

export default router;

//Repeat similar logic for playlists and playlist-tracks, with:
//Foreign key checks (SELECT before INSERT)

//Unique violation handling (23505)
//Parameter validation (isNaN())
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send("Invalid input type.");
  }
  if (err.code === "23503") {
    return res.status(400).send("Referenced record not found.");
  }
  if (err.code === "23505") {
    return res.status(400).send("Track already in playlist.");
  }

  console.error(err);
  res.status(500).send("Server error.");
});
