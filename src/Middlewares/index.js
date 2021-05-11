import jwtMV from './JWT';
import loggerMV from './Logger/morgan'; // TODO: just log id
import userMv from './User';

export default [loggerMV, jwtMV, userMv];
