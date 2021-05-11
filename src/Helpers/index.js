import 'dotenv/config';
import * as uuid from 'uuid';
import { isProduction } from '../Constants/Business';
import CustomError from '../Entity/CustomError';
import jwt from 'jsonwebtoken';

// #region creating
export const createToken = (data, expiresIn = process.env.JWT_EXPIRE_TIME) => new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn
    }, (err, token) => {
        if (err) reject(err);
        resolve(token);
    });
});

export const generateId = () => uuid.v4();

export const filterByPatch = (Patch, DeepEquality) => (dbData) => {

    const keys = Object.keys;
    const is = (first, second) => first !== undefined && second !== undefined;
    let isMatch = false;

    keys(Patch).forEach((key) => {
        const dbObject = dbData[key] || {};
        const patchObject = Patch[key] || {};

        if (DeepEquality) {
            if (deepEqual(dbData, Patch)) isMatch = true;
        } else if (is(dbObject, patchObject)) {
            if (someEqual(patchObject, dbObject)) isMatch = true;
        }

    });
    return isMatch;
};

export const deepEqual = (x, y) => {
    const keys = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        keys(x).length === keys(y).length && keys(x).every((key) =>
            deepEqual(x[key], y[key]))
    ) : (x === y);
};

export const someEqual = (x, y, excludeKeyList = []) => {
    const keys = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        keys(x).some((key) => excludeKeyList.indexOf(key) === -1 && deepEqual(x[key], y[key]))
    ) : (() => {
        // x === y && console.log({ x, y });
        return x === y;
    })();
};

export const filterByKeyAndValue = (KeyList, ValueList) => (strict = true) => (dbData) => {
    let isMatch = !strict;
    KeyList.forEach((key) => {
        if (ValueList.indexOf(dbData[key]) !== -1) isMatch = strict;
    });

    return isMatch;
};

// #endregion

// #region validation

export const required = (Message) => {
    throw new CustomError(Message);
};

export const stringify = (data) => JSON.stringify(data, null, isProduction ? 0 : 2);

// #endregion
