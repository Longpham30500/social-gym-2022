const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/post')
    .post(auth, postCtrl.createPost)

module.exports = router