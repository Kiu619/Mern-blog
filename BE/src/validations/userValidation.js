import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import { env } from '../config/environment.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log('token', token)
    if (!token) {
        return next(errorHandler(401, '1'));
    }
    jwt.verify(token, env.ACCESS_TOKEN_SECRET_SIGNATURE, async (err, decoded) => {
        if (err) {
            return next(errorHandler(401, '2'));
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(errorHandler(401, '3'));
        }
        req.user = user;
        next();
    })
}

export const userValidation = {
    verifyToken
}
