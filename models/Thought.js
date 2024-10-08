const mongoose = require('mongoose');
const reactionSchema = require('./Reaction'); // Import Reaction schema

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
