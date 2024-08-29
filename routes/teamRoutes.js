const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeAdmin = require('../middleware/authorizeAdmin');

// create a team (admin only)
router.post('/', authenticateJWT, authorizeAdmin, teamController.createTeam);

// get all teams (admin only)
router.get('/', authenticateJWT, authorizeAdmin, teamController.getAllTeams);

// assign a task to a team (admin only)
router.post('/:teamId/tasks', authenticateJWT, authorizeAdmin, teamController.assignTask);

// get tasks for a team
router.get('/:teamId/tasks', authenticateJWT, teamController.getTasks);

// update task status
router.patch('/:teamId/tasks/:taskId', authenticateJWT, teamController.updateTaskStatus);

module.exports = router;
