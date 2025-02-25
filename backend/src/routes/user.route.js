import express from 'express';

import { updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update-profile', updateProfile);

export default router;