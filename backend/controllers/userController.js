const User=require('../models/userModel');
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn:'3d'})
}
//used JWT_SECRET instead of SECRET to avoid confusion with the secret key used in env file

//login user
const loginUser=async(req, res)=>{
    const { email,password }=req.body;
    try{
        const user=await User.login(email,password)

        const token=createToken(user._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//signup user
const signupUser=async(req, res)=>{
    const { email, password }= req.body;
    try{
        const user=await User.signup(email,password)
        //create token
        const token=createToken(user._id)
        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

}


// Create or Update Workout Goals
const createOrUpdateGoals = async (req, res) => {
    const {  goals } = req.body;
    const userId=req.user._id
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Update or add new goals
      user.goals = goals;
      await user.save();
      res.status(200).json(user.goals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create or update goals' });
    }
  };
  
  // Get Workout Goals
  const getGoals = async (req, res) => {
    const userId=req.user._id
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user.goals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve goals' });
    }
  };
  
  // Delete a Goal by Exercise Name
  const deleteGoal = async (req, res) => {
    const userId=req.user._id
    const { exercise } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Filter out the goal for the given exercise
      user.goals = user.goals.filter(goal => goal.exercise !== exercise);
      await user.save();
  
      res.status(200).json({ message: 'Goal deleted successfully', goals: user.goals });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete goal' });
    }
  };
  
  // Update a specific goal by exercise
  const updateGoal = async (req, res) => {
    const userId=req.user._id
    const {  exercise } = req.params;
    const { targetLoad, targetReps } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Find and update the goal for the specified exercise
      const goal = user.goals.find(g => g.exercise === exercise);
      if (!goal) return res.status(404).json({ message: 'Goal not found for this exercise' });
  
      goal.targetLoad = targetLoad;
      goal.targetReps = targetReps;
  
      await user.save();
      res.status(200).json(user.goals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update goal' });
    }
  };
  

module.exports={ signupUser, loginUser,createOrUpdateGoals,getGoals,deleteGoal,updateGoal}