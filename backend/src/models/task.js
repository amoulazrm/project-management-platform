const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
 title: {
 type: String,
 required: true,
 trim: true
 },
 description: {
 type: String,
 trim: true
 },
 priority: {
 type: String,
 enum: ['Low', 'Medium', 'High'],
 default: 'Medium'
 },
 status: {
 type: String,
 enum: ['Pending', 'In Progress', 'Done'],
 default: 'Pending'
 },
 dueDate: {
 type: Date
 },
 userId: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: true
 },
 createdAt: {
 type: Date,
 default: Date.now
 }
});
module.exports = mongoose.model('Task', taskSchema);