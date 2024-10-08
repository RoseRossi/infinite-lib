const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    characters: [{
        name: String,
        role: String
    }],
    versiones: [{
        content: String,
        createdAt: { type: Date, default: Date.now }
    }],
    author: {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Story', StorySchema);
