const { Thought, User } = require('../models');

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    console.error('Error fetching thoughts:', err);
    res.status(500).json({ message: 'Failed to fetch thoughts', error: err.message });
  }
};

// Create a new thought
exports.createThought = async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();

    // Add the thought to the user's thoughts
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });

    res.status(201).json(newThought);
  } catch (err) {
    console.error('Error creating thought:', err);
    res.status(500).json({ message: 'Failed to create thought', error: err.message });
  }
};

// Update a thought
exports.updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true }).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error('Error updating thought:', err);
    res.status(500).json({ message: 'Failed to update thought', error: err.message });
  }
};

// Delete a thought
exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought from the user's thoughts
    await User.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    console.error('Error deleting thought:', err);
    res.status(500).json({ message: 'Failed to delete thought', error: err.message });
  }
};
