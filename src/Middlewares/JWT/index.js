import expressJwt from 'express-jwt';
import 'dotenv/config';
import { unAuthorizedRoutes } from '../../Constants/Routes';

const jwtMV = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM]
}).unless({ path: unAuthorizedRoutes });

export default jwtMV;
