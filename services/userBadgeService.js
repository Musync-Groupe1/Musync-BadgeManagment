const db = require('../db');

// Add a badge to a user
async function addBadge(user_id, badge_id) {
  const result = await db.query(
    'INSERT INTO "UserBadge" (user_id, badge_id) VALUES ($1, $2) RETURNING *;',
    [user_id, badge_id]
  );
  return result.rows[0];
}

// Remove a badge from a user
async function removeBadge(user_id, badge_id) {
  await db.query(
    'DELETE FROM "UserBadge" WHERE user_id = $1 AND badge_id = $2;',
    [user_id, badge_id]
  );
}

// Get all badges of a user
async function getUserBadges(user_id) {
  const result = await db.query(
    `SELECT b.* FROM "UserBadge" ub
     JOIN "Badge" b ON ub.badge_id = b.badge_id
     WHERE ub.user_id = $1;`,
    [user_id]
  );
  return result.rows;
}

// Get all users having a given badge
async function getUserBadgesFromBadge(badge_id) {
  const result = await db.query(
    `SELECT ub.* FROM "UserBadge" ub
     WHERE ub.badge_id = $1;`,
    [badge_id]
  );
  return result.rows;
}

module.exports = {
  addBadge,
  removeBadge,
  getUserBadges,
  getUserBadgesFromBadge,
};

