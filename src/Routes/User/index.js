import { Router } from 'express';
import * as UserController from '../../Controllers/User';

const router = Router();

router.post('/register', UserController.Post);
router.get('/', UserController.Get);
router.post('/login', UserController.Login);
router.put('/', UserController.Put);
router.delete('/', UserController.Delete);

export default router;
