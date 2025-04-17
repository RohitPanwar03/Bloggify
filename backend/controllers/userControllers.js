
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {userModel} from "../models/userModel.js";

export const registerController= async(req, res)=>{
    try {
        const { name, email, password } = req.body;
        // Validate input 
        if (!name || !email || !password) {
            return res.status(400).json({success:false, message: 'All fields are required' });
        }
        // Check if user already exists
        const existinguser = await userModel.find({email})
        if (existinguser.length > 0) {
            return res.status(400).json({success:false, message: 'User already exists' });
        }
        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({ name, email, password:hashedPassword });
   
        res.status(201).json({success:true, message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}


export const loginController= async(req, res)=>{
    try {
        const { email, password } = req.body;
        // Validate input 
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user exists
        const existinguser = await userModel.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({success:false, message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if (!isMatch) {
            return res.status(400).json({success:false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.status(200).json({success:true, message: 'User logged in successfully',token });

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message: 'Internal server error' });
        
    }
}

export const getUserController= async(req, res)=>{
    try {
        const userId= req.user;
        console.log(userId)
        const user = await userModel.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({success:false, message: 'User not found' });
        }
        res.status(200).json({success:true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message: 'Internal server error' });
        
    }
}