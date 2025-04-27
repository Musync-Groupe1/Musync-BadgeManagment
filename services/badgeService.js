const db = require('../db');

// Create a badge
async function createBadge(name) {
  const result = await db.query(
    'INSERT INTO "Badge" (name) VALUES ($1) RETURNING *;',
    [name]
  );
  return result.rows[0];
}

// Get a badge by ID
async function getBadge(badgeId) {
  const result = await db.query(
    'SELECT * FROM "Badge" WHERE badge_id = $1;',
    [badgeId]
  );
  return result.rows[0];
}

// Delete a badge by ID
async function deleteBadge(badgeId) {
    await db.query(
      'DELETE FROM "Badge" WHERE badge_id = $1;',
      [badgeId]
    );
  }
  
module.exports = {
  createBadge,
  getBadge,
  deleteBadge,
};
