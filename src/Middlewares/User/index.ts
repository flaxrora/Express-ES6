import jwt from 'jsonwebtoken';
import BaseUser from '../../Entity/User';
import 'dotenv/config';
import CustomError from '../../Entity/CustomError';

const _decode = async (token: string): Promise<any> => {
    return await jwt.verify(process.env.JWT_BEARER_USAGE ? token.slice(7) : token,
        process.env.JWT_SECRET);
};

export default async function extractUser(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const { _Id } = await _decode(token);
        const invalidTokenHandler = () => {
            if (!req.User) return res.status(400).json({ ...new CustomError('User not found') });
        };
        req.User = await new BaseUser(_Id).Get().catch(invalidTokenHandler);
        if (!req.User) invalidTokenHandler();

    }
    next();
}
