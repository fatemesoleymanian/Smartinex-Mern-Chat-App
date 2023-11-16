import express, { Router } from 'express';
const router: Router = express.Router();
const { accessChat,
    fetchChats,
    fetchGroupChats,
    leaveGroupOrClearChat,
    createGroupChat,
    addToGroup } = require('../controllers/ChatController')
const authMiddleware = require('../middlewares/AuthMiddleware')


router.post('/', authMiddleware, accessChat);
router.get('/', authMiddleware, fetchChats);
router.get('/groups', authMiddleware, fetchGroupChats);
router.post('/group', authMiddleware, createGroupChat);
router.put('/leave-group', authMiddleware, leaveGroupOrClearChat);
router.put('/add-member', authMiddleware, addToGroup)









module.exports = router;