import JWT from 'jsonwebtoken';
const generateToken = async (userInfor, secretSignature, tokenLife) => {
    try {
        return JWT.sign(userInfor, secretSignature, {  algorithm: 'HS256', expiresIn: tokenLife })
    } catch (error) {
        throw new Error(error);
    }
}

const verifyToken = async (token, secretSignature) => {
    try {
        return JWT.verify(token, secretSignature);
    } catch (error) {
        throw new Error(error);
    }
}

export const jwtProvider = {
    generateToken,
    verifyToken
}
