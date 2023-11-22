const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const examplesRouter = require('./examplesRouter')


router.use('/user', userRouter)
router.use('/examples', examplesRouter)

module.exports = router