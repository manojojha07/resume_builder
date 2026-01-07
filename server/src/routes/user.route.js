import express from 'express' 
import { registerUser , loginUser, getUserById, getUserResume } from '../controllers/user.controller.js'
import protect from '../midlweres/authMiddlewere.js' 


const userRouter = express.Router();

userRouter.post('/register' , registerUser );
userRouter.post('/login' , loginUser );
userRouter.get('/data', protect , getUserById)

userRouter.get('/resume' , protect ,  getUserResume )

export default userRouter;