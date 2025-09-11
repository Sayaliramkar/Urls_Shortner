import e from "express";
import { nanoid } from "nanoid";
// import { cookieOptions } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateNanoId = async (length = 7) => {
    return nanoid(length);
};


export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id)
    return decoded.id;
};