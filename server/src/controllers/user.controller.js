import { findByEmail, genrateToken } from "../dao/userDao.js";
import  User   from "../models/userModel.js";
import bcrypt from 'bcrypt'
import Resume from '../models/resumeModel.js'



export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const userExits = await findByEmail(email);
        if (userExits) {
            return res.status(400).json({ message: "User Already Exists !" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = genrateToken(newUser._id);

        // password remove kar do
        newUser.password = undefined;

        // ✅ Send token + user
       
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
      
        

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: "User not Authorized !" });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: "User not Authorized !" });
        }
        const token = genrateToken(user._id)
        user.password = undefined;
  
        return res.status(200).json({ message: "User Login Sucess full ", token, user })

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// getting user by id 
export const getUserById = async (req , res) => {
    try {
       const userId = req.userId;
       const user =  await User.findById(userId)
       if(!user){
        return res.status(404).json({message: "User not found "});
       }
    //    return user
    user.password = undefined;
    return res.status(200).json({user })

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// get all resume with id 

export const  getUserResume = async (req , res ) => {
   try {
    const  userId = req.userId;

    const resumes = await Resume.find({userId});
    return res.status(200).json({resumes})
    
   } catch (error) {
    return res.status(400).json({mesasage : error.mesasage })
   }
    
}


export default { registerUser, loginUser ,getUserById , getUserResume};