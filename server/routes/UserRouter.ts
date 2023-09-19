import express, { Router } from 'express';
const router: Router = express.Router();

const { login, signup } = require('../controllers/AuthController')

router.post('/auth/login', login)
router.post('/auth/signup', signup)









module.exports = router;