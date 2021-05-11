import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { Force = false } = req.body;

    await req.User.Delete(Force);

    res.status(200).json({
        Success: true,
        User: req.User
    });
});
