import { cookieOptions } from "../config/config.js";
import wrapasync from "../utils/tryCatchWrapper.js"
import { loginUser, registerUser } from "../services/auth.service.js";

export const register_user = wrapasync(async (req, res) => {
    const { name, email, password } = req.body;
    const {token, user } = await registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ 
        message: "User registered successfully"
     });
})


export const login_user = wrapasync(async(req, res) => {
    const { email, password } = req.body;
    const {token, user } = await loginUser(email, password);

    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ 
        user: user,
        message: "User logged in successfully"
     });
})

export const logout_user = wrapasync(async(req, res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({ 
        message: "User logged out successfully"
     });
})

export const get_current_user = wrapasync(async(req, res) => {
    res.status(200).json({ 
        user: req.user,
        message: "User fetched successfully"
     });
})


