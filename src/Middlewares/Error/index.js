export default function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            Success: false,
            Error: {
                Name: 'UnauthorizedError',
                Messages: ['Invalid token']
            }
        });
    }
    if (err) {
        const { Status, Message, Name, message } = err;

        process.env.NODE_ENV !== 'production' && console.log(err);

        return res.status(Status || 400).json({
            Success: false,
            Status,
            Error: {
                Name,
                Messages: typeof Message === 'string' ? [Message || message] : Message,
                ...(Message ? {} : err)
            },
        });
    }
    next();
}
