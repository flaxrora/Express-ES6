import morgan from 'morgan';
import fs from 'fs';

morgan.token('User', (req) => {
    return JSON.stringify(req.User);
});

const logger = morgan(
    ':User\t :date[iso] :status :method\t  :res[content-length]\t :response-time ms\t :url',
    {
        stream: fs.createWriteStream('access.log', {
            flags: 'a'
        })
    }
);

export default logger;
