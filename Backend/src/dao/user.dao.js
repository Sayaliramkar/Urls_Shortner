import User from "../models/user.model.js";
import shorturlmodel from "../models/shorturlmodel.js";

export const findUserByEmail = async (email) => {
    // console.log(email);
    return await User.findOne({email})
}   

export const findUserByEmailAndPassword = async (email) => {
    // console.log(email);
    return await User.findOne({email}).select("+password")
}  

export const findUserById = async (userId) => {
    return await User.findById(userId)
}

export const createUser = async (name, email, password) => {
    const newUser = new User({
        name,
        email,
        password
    })
    await newUser.save();
    return newUser;
}

export const getAllUserUrlsDao = async (userId) => {
    return await shorturlmodel.find({user: userId})
}