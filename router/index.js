const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
// const postsRouter = require('./postsRouter')
// const tableRouter = require('./tableRouter')


router.use('/user', userRouter)
// router.use('/posts', postsRouter)
// router.use('/table', tableRouter)

module.exports = router