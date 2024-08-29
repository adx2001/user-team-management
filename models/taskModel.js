const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    assignedAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Task', TaskSchema)