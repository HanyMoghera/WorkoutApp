const exprees = require('express');

const router = exprees.Router()

// controllers 
const {loginUser,signupUser } = require('../controllers/userController');
// login route 
router.post('/login',loginUser)

// signup router 
router.post('/signup', signupUser)


module.exports = router;