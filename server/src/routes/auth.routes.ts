import express from 'express';
import { loginController } from '../controllers/login.controller.js';
import { registerController } from '../controllers/register.controller.js';
import { googleAuthController } from '../controllers/google.controller.js';

export const authRoutes = express.Router();

authRoutes.post('/login', loginController);

authRoutes.post('/auth/google', googleAuthController);

authRoutes.post('/register', registerController);
