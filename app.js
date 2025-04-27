const express = require('express');
const badgeRoutes = require('./routes/badgeRoutes');
const userBadgeRoutes = require('./routes/userBadgeRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const db = require('./db');


// ========================================
// Dummy Routes to Create Test Data
// ========================================

// 1. Create dummy user
    app.post('/dummy/user', async (req, res) => {
    try {
      const result = await db.query(
        `INSERT INTO "User" (is_certified, music_sharing_count, playlist_sharing_count, comment_count)
         VALUES (TRUE, 23, 12, 40) RETURNING *;`
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating dummy user');
    }
  });
  
  // 2. Create dummy badge
  app.post('/dummy/badge', async (req, res) => {
    try {
      const result = await db.query(
        `INSERT INTO "Badge" (name) VALUES ($1) RETURNING *;`,
        ['Superstar']
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating dummy badge');
    }
  });
  
  // 3. Create dummy user-badge relation
  app.post('/dummy/userbadge', async (req, res) => {
    try {
      const { user_id, badge_id } = req.body; // you must provide ids
      const result = await db.query(
        `INSERT INTO "UserBadge" (user_id, badge_id) VALUES ($1, $2) RETURNING *;`,
        [user_id, badge_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating dummy user-badge relation');
    }
  });
  // ========================================
  // List all users, badges, and user-badges
  // ========================================
  app.get('/list/all', async (req, res) => {
    try {
      const users = (await db.query(`SELECT * FROM "User";`)).rows;
      const badges = (await db.query(`SELECT * FROM "Badge";`)).rows;
      const userBadges = (await db.query(`SELECT * FROM "UserBadge";`)).rows;
  
      res.json({
        users,
        badges,
        userBadges,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching all data');
    }
  });
  
  // ========================================
  
  

  

// Use the routes
app.use('/badges', badgeRoutes);
app.use('/userbadges', userBadgeRoutes);
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
