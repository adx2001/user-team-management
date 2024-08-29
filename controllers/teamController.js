const Team = require('../models/teamModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel'); 

// Create a team
exports.createTeam = async (req, res) => {
    const { teamName, userIds } = req.body;
  
    try {
      // validate that all user ids are valid
      const users = await User.find({ '_id': { $in: userIds } });
      if (users.length !== userIds.length) {
        return res.status(400).json({ message: 'One or more user IDs are invalid' });
      }
  
      const team = new Team({ teamName, users: userIds });
      await team.save();
  
      res.status(201).json({ message: 'Team created successfully', team });
    } catch (err) {
      console.log("🚀 ~ exports.createTeam= ~ err:", err);
      res.status(400).json({ error: 'Failed to create team: ' + err.message });
    }
  };
  
  // get all teams
  exports.getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find().populate('users', 'email');
      res.status(200).json(teams);
    } catch (err) {
      console.log("🚀 ~ exports.getAllTeams= ~ err:", err);
      res.status(400).json({ error: 'Failed to fetch teams: ' + err.message });
    }
  };
  
  // assign a task to a team
  exports.assignTask = async (req, res) => {
    const { teamId } = req.params;
    const { description, details } = req.body;
  
    try {
      const task = new Task({ teamId, description, details });
      await task.save();
  
      res.status(201).json({ message: 'Task assigned successfully', task });
    } catch (err) {
      console.log("🚀 ~ exports.assignTask= ~ err:", err);
      res.status(400).json({ error: 'Failed to assign task: ' + err.message });
    }
  };
  
  // Get tasks for a team
  exports.getTasks = async (req, res) => {
    const { teamId } = req.params;
  
    try {
      const tasks = await Task.find({ teamId });
      res.status(200).json(tasks);
    } catch (err) {
      console.log("🚀 ~ exports.getTasks= ~ err:", err);
      res.status(400).json({ error: 'Failed to fetch tasks: ' + err.message });
    }
  };
  
  // update task status
  exports.updateTaskStatus = async (req, res) => {
    const { teamId, taskId } = req.params;
    const { status } = req.body;
  
    try {
      const task = await Task.findOne({ _id: taskId, teamId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.status = status;
      await task.save();
  
      res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (err) {
      console.log("🚀 ~ exports.updateTaskStatus= ~ err:", err);
      res.status(400).json({ error: 'Failed to update task status: ' + err.message });
    }
  };