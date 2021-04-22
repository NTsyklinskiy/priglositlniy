const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();


router.post('/login', authController.login);

router
  .route('/')
  .post(userController.createUser);

router.use(authController.protect)
router
  .get(
    '/me', 
    userController.getMe, 
    userController.getUser
  );
  
module.exports = router;
    
    