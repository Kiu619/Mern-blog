import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { env } from "../config/environment.js";
import { jwtProvider } from "../providers/jwtProvider.js";
import jwt from 'jsonwebtoken';
import ms from 'ms';

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || !username.trim() || !email.trim() || !password.trim()) {
        next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password || !email.trim() || !password.trim()) {
        next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User  not found"));
        }
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }
        // const accessToken = await jwtProvider.generateToken({ id: validUser._id }, env.ACCESS_TOKEN_SECRET_SIGNATURE, "30h");
        const accessToken = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, env.ACCESS_TOKEN_SECRET_SIGNATURE);
        const { password: pass, ...userInfo } = validUser._doc; // remove password from user info
        res
            .status(200)
            .cookie('accessToken', accessToken, {
                maxAge: ms('14 days'),
                httpOnly: true,
            })
            .json(userInfo);
    } catch (error) {
        next(error);
    }
}

const googleAuth = async (req, res, next) => {
    const { email, name, profilePicture } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin  }, env.ACCESS_TOKEN_SECRET_SIGNATURE);
            const { password, ...userInfo } = user._doc;
            res
                .status(200)
                .cookie('accessToken', token, {
                    maxAge: ms('14 days'),
                    httpOnly: true,
                })
                .json(userInfo);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User({ username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword, 
                profilePicture,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, env.ACCESS_TOKEN_SECRET_SIGNATURE);
            const { password, ...userInfo } = newUser._doc;
            res
                .status(200)
                .cookie('accessToken', token, {
                    maxAge: ms('14 days'),
                    httpOnly: true,
                })
                .json(userInfo);
        }


    } catch (error) {
        next(error);
    }
}

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ message: "Sign out successful" });
    }
    catch (error) {
        next(error);
    }
}

export const authController = {
    signUp, signIn, googleAuth, signOut
}