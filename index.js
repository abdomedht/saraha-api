import  bootstrap  from './src/app.controller.js'
import  express  from 'express'
import dotenv from 'dotenv'
dotenv.config({path:'./src/config/.env.dev'})
const app = express()
const port = process.env.port||3000

bootstrap(app , express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))