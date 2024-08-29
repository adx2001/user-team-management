const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    }]
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Team', TeamSchema);