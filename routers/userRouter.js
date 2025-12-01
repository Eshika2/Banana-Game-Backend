import express from 'express';

import { getAuthData, sendOTP, userEdit, userLeaderboard, userLogin, userPasswordReset, userRegister } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/auth/register', userRegister);
userRouter.post('/auth/login', userLogin);
userRouter.get('/auth/data', protect, getAuthData);
userRouter.get('/leaderboard', protect, userLeaderboard);
userRouter.post('/edit', protect, userEdit);
userRouter.post('/sendOTP', sendOTP);
userRouter.post('/password/reset', userPasswordReset);

export default userRouter;