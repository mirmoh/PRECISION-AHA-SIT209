const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/registerr', authController.registerr);
router.post('/login', authController.login);

module.exports = router