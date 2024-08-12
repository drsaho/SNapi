const router = require('express').Router();

const {
    getAllThoughts,  // Updated to match the controller
    getThought,    
    createThought,
    updateThought,
    deleteThought,
    addReaction,   
    deleteReaction
} = require('../../controllers/thoughtController');

// Route ->thoughts
router.route('/')
    .get(getAllThoughts)  // Get all thoughts
    .post(createThought); // Create a new thought

// Route ->thoughtId
router.route('/:thoughtId')
    .get(getThought)    // Get a single thought by ID
    .put(updateThought) // Update a thought by ID
    .delete(deleteThought); // Delete a thought by ID

// Route -> thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction); // Add a reaction to a thought

// Route -> reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction); // Delete a reaction from a thought

// Exports
module.exports = router;
