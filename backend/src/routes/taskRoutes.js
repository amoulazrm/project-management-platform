const express = require('express');
const {
 createTask,
 getUserTasks,
 updateTask,
 deleteTask
} = require('../controllers/taskController');
const router = express.Router();
// CRUD pour les tâches
router.post('/', createTask);
router.get('/user/:userId', getUserTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
module.exports = router;