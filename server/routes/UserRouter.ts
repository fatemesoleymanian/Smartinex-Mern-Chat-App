import express, { Router } from 'express';
const router: Router = express.Router();
const { index } = require('../controllers/UserController')
const authMiddleware = require('../middlewares/AuthMiddleware')
const { login, signup } = require('../controllers/AuthController')

router.post('/auth/login', login)
router.post('/auth/signup', signup)
router.get('/', authMiddleware, index)









module.exports = router;