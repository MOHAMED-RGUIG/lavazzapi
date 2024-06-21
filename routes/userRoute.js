const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // User already exists with the same email
            return res.status(400).send('User already registered with this email');
        }else{
                 const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).send('User registered successfully');    
        }

        // Create a new user
   
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login',async (req,res)=>{
        const {email,password} = req.body
        try{
                const user = await User.find({email,password})
        if(user.length>0){
                const currentUser = {
                        name : user[0].name,
                        email : user[0].email,
                        isAdmin : user[0].isAdmin,
                        _id: user[0]._id
                }    
                res.send(user);
        }else{
                return res.status(400).json({message:'User Login Failed'});
        }
        }catch(error){ 
                return res.status(400).json({message:'Something went wrong'});
        }
})
module.exports = router