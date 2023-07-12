const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//REGISTER
router.post('/register',registerController);

//LOGIN
router.post('/login',loginController);

//GET CURRENT USER
router.get('/current-user',authMiddleware,currentUserController);

//export
module.exports = router;
