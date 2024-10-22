const express= require('express');

const { signupUser, loginUser,createOrUpdateGoals,getGoals,updateGoal,deleteGoal }=require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth')
const router=express.Router()

module.exports=router;

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

// Create or Update Goals
router.post('/goals', requireAuth,createOrUpdateGoals);

// Get Goals
router.get('/goals',requireAuth, getGoals);

// Update a specific goal
router.put('/goals/:exercise',requireAuth, updateGoal);

// Delete a specific goal
router.delete('/goals/:exercise',requireAuth,deleteGoal);