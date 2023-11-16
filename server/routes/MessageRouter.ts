import express, { Router } from 'express';
const router: Router = express.Router();
const { fetchMessages, createMessage } = require('../controllers/MessageController')
const authMiddleware = require('../middlewares/AuthMiddleware')

router.post('/', authMiddleware, createMessage)
router.get('/:chatId', authMiddleware, fetchMessages)









module.exports = router;