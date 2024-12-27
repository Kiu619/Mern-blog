import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';

const signUp = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // Kiểm tra xem email, password và username có được cung cấp hay không
        if (!email || !password || !username) {
            throw errorHandler(400, 'Email, password and username are required');
        }

        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
        const existingUserName = await User.findOne({ username });

        if (existingUserName) {
            // throw errorHandler(400, 'Email already exists');
            return res.status(500).json({ message: 'Username already exists' });
        }

        const existingEmailUser = await User.findOne({ email });

        if (existingEmailUser) {
            // throw errorHandler(400, 'Email already exists');
            return res.status(500).json({ message: 'Email already exists' });
        }

        // Tiếp tục với logic đăng ký của bạn ở đây nếu email không tồn tại trong cơ sở dữ liệu
        next();

    } catch (error) {
        next(error);
    }
}

export const authValidation = {
    signUp
}

