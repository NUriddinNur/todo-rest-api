import express from 'express'
import database from './utils/db.js'

import mockData from './utils/mock.js'
import userRouter from './routes/user.js'
import todoRouter from './routes/todo.js'

const PORT = process.env.PORT || 4002


!async function () {
    const app = express()
    const db = await database()

    // load mock data
    // await mockData({ sequelize: db })

    // connect to db
    app.use((req, res, next) => {
        req.models = db.models
        req.sequalize = db.sequalize
        next()
    })

    // middlewares
    app.use(express.json())

    // routes
    app.use(userRouter)
    app.use(todoRouter)

    app.get('/', (req, res) => res.end("Allo"))
    app.listen(PORT, () => console.log(`server resde at http://localhost:${PORT}`))
}()
