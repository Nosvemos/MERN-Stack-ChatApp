import express from 'express';

import { updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.put('/update-profile', protectRoute, updateProfile);

export default router;