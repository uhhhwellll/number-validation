const Router = require('express')
const userCont = require('../controls/usercontrols.js')
const router = new Router();

router.get('/getuser', userCont.getalluser)
router.get('/getuser:id', userCont.getuser)
router.post('/register', userCont.register)
router.post('/login', userCont.login)
router.put('/updateuser:id', userCont.updateuser)
router.delete('/deleteuser:id', userCont.deleteuser)

module.exports = router