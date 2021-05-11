import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {

    res.status(200).json({
        Success: true,
        User: req.User
    });
});
