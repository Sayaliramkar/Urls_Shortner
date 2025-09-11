// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"
import { findUserByEmail, createUser, findUserByEmailAndPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorhandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    console.log(email)
    const user = await findUserByEmail(email)
    if (user) {
        throw new ConflictError("User already exists")
    }
    const newUser = await createUser(name, email, password)

    const token = await signToken({
        id: newUser._id
    })

    return {token, user: newUser};
}


export const loginUser = async (email, password) => {
    const user = await findUserByEmailAndPassword(email)
    if (!user) {
        throw new Error("Invalid credentials")
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
        throw new Error("Invalid credentials")
    }
    delete user.password;
    const token = signToken({
        id: user._id
    })
    // console.log(user)

    return { token, user };
}

