import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
import UserModal from '../models/user.js';

const secret = "text";

export const signIn = async (req,res) =>{
    const {email,password }= req.body;
    try {
        const oldUser = await UserModal.findOne({email});
        if(!oldUser) return res.status(404).json({message: "User not found"});

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Passwords do not match"});
        const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"1h" });

        res.status(200).json({result:oldUser,token});
    } catch (error) {
        res.status(500).json({message:'something went wrong'});
          console.log(error);
    }
}

export const signup = async(req,res) =>{
    const {email,password,firstName,lastName} = req.body;
    try{
        const oldUser = await UserModal.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"user already exists"})
        }
        const hashadPassword =  await bcrypt.hash(password,12);

        const result = await UserModal.create({
            email,
            password:hashadPassword,
            name:`${firstName} ${lastName}`,

        });

        const token =jwt.sign({email:result.email, id:result.id},secret,{expiresIn:"1h" });
        res.status(201).json({result,token});
    }
    catch (error){
        res.status(500).json({message:'something went wrong'});
          console.log(error);
    }

};