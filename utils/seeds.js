// seedData.js
const mongoose = require('mongoose');
const { Thought, User } = require('./models'); // Adjust path to models as needed

const users = [
  { 
    _id: new mongoose.Types.ObjectId(),
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
  },
  { 
    _id: new mongoose.Types.ObjectId(),
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
  },
];

const thoughts = [
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: 'This is a thought by user1.',
    username: 'user1',
    reactions: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: 'This is another thought by user2.',
    username: 'user2',
    reactions: [],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/Snapidb', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Remove existing data
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Insert seed data
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    // Update user documents with thought IDs
    await User.updateOne({ _id: users[0]._id }, { $push: { thoughts: thoughts[0]._id } });
    await User.updateOne({ _id: users[1]._id }, { $push: { thoughts: thoughts[1]._id } });

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
