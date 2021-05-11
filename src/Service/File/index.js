import * as fs from 'fs';
import * as path from 'path';
import asyncHandler from 'express-async-handler';
import { stringify } from '../../Helpers';
class File {
    static resolveBasePath = (destinationPath) => path.join(__dirname, '../../../', destinationPath)

    static isExist(sourcePath) {
        return fs.existsSync(sourcePath);
    }

    static checkFile = asyncHandler(async (sourcePath, defaultValue = {}) => {
        const directory = this.resolveBasePath(sourcePath);
        if (!this.isExist(directory)) {
            await this.writeFile(sourcePath, stringify(defaultValue));
        }
    })

    static checkDirectory = asyncHandler(async (sourcePath) => {
        const directory = this.resolveBasePath(sourcePath);
        if (!this.isExist(directory)) {
            await fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    });

    static readFile = asyncHandler(async (sourcePath) => {
        const directory = this.resolveBasePath(sourcePath);

        return await new Promise((resolve, reject) => {
            fs.readFile(directory, (err, readedData) => {
                // throw new CustomError(err.message);
                if (err) reject(err);
                resolve(JSON.parse(readedData));
            });
        });
    })

    static deleteFile = asyncHandler(async (sourcePath, force = false) => {
        const directory = this.resolveBasePath(sourcePath);
        await fs.rmdirSync(directory, { recursive: force });
    });

    static copyFile = asyncHandler(async (source, destination) => {
        await this.checkDirectory(destination);
        await fs.copyFile(this.resolveBasePath(source), this.resolveBasePath(destination));
    });

    static writeFile = asyncHandler(async (filePath, content) => {
        await fs.writeFile(this.resolveBasePath(filePath), content, (err) => {
            if (err) throw err;
        });
    })

    static mkdir = asyncHandler(async (filePath) => {
        await fs.mkdir(this.resolveBasePath(filePath), { recursive: true });
    })

}

export default File;
