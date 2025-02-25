import express from 'express';

import { getUsersForSidebar, getMessages } from '../controllers/message.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);

router.get('/:id', protectRoute, getMessages);

export default router;