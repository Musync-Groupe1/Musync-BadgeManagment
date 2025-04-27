const express = require('express');
const router = express.Router();
const badgeService = require('../services/badgeService');
const userBadgeService = require('../services/userBadgeService');
// Create a new badge
router.post('/', async (req, res) => {
try {
    const badge = await badgeService.createBadge(req.body.name);
    res.status(201).json(badge);
} catch (err) {
    console.error(err);
    res.status(500).send('Error creating badge');
}
});
// Get a badge by ID
router.get('/:id', async (req, res) => {
try {
const badge = await badgeService.getBadge(parseInt(req.params.id));
if (!badge) return res.status(404).send('Badge not found');
res.json(badge);
} catch (err) {
console.error(err);
res.status(500).send('Error retrieving badge');
}
});
// Get users who have a specific badge
router.get('/:id/users', async (req, res) => {
try {
const userBadges = await userBadgeService.getUserBadgesFromBadge(parseInt(req.params.id));
res.json(userBadges);
} catch (err) {
console.error(err);
res.status(500).send('Error fetching users of badge');
}
});

// DELETE /badges/:id - delete badge by ID
router.delete('/:id', async (req, res) => {
    try {
      const badgeId = parseInt(req.params.id);
      await badgeService.deleteBadge(badgeId);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting badge');
    }
  });
  
  
module.exports = router;
