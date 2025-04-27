const express = require('express');
const router = express.Router();
const userBadgeService = require('../services/userBadgeService');
// Link a badge to a user
router.post('/', async (req, res) => {
try {
const userBadge = await userBadgeService.addBadge(req.body.user_id, req.body.badge_id);
res.status(201).json(userBadge);
} catch (err) {
console.error(err);
res.status(500).send('Error adding badge to user');
}
});
// Remove a badge from a user
router.delete('/', async (req, res) => {
try {
await userBadgeService.removeBadge(req.body.user_id, req.body.badge_id);
res.status(204).send();
} catch (err) {
console.error(err);
res.status(500).send('Error removing badge from user');
}
});
// Get all badges of a user
router.get('/user/:userId/badges', async (req, res) => {
try {
const badges = await userBadgeService.getUserBadges(parseInt(req.params.userId));
res.json(badges);
} catch (err) {
console.error(err);
res.status(500).send('Error fetching user badges');
}
});
// Get all badges of a user
router.get('/badge/:badge_id/users', async (req, res) => {
try {
const users = await userBadgeService.getUserBadgesFromBadge(parseInt(req.params.badge_id));
res.json(users);
} catch (err) {
console.error(err);
res.status(500).send('Error fetching user badges');
}
});

module.exports = router;
