const router = require('express').Router() //code thieu
const commentCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

router.post('/comment', auth, commentCtrl.createComment)

module.exports = router