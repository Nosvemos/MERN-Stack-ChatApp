import express from 'express';

import { updateProfile, checkAuth } from '../controllers/user.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth);

export default router;