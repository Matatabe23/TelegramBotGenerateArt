const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const examplesRouter = require('./examplesRouter')
// const tableRouter = require('./tableRouter')


router.use('/user', userRouter)
router.use('/examples', examplesRouter)
// router.use('/table', tableRouter)

module.exports = router