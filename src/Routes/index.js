import { Router } from 'express';
import listEndpoints from 'express-list-endpoints';
import UserRouter from './User';

const router = Router();


router.use('/user', UserRouter);

router.all('*', (req, res) => {
    let endpoints = listEndpoints(router);
    endpoints.pop();

    res.status(400).json({
        Success: false,
        error: [
            'Invalid route'
        ],
        routes: endpoints
    });
});

export default router;
