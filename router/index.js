const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const adminPanelRouter = require('./adminPanelRouter')
const examplesRouter = require('./examplesRouter')


router.use('/user', userRouter)
router.use('/examples', examplesRouter)
router.use('/adminPanel', adminPanelRouter)

module.exports = router