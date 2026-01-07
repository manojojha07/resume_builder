import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'


export const findByEmail = async(email) => {
 return await User.findOne({email});
}

export const genrateToken = (userId) => {
const token = jwt.sign({ userId }, process.env.SECRATE_KEY, {expiresIn : '1d'});
return token;
}