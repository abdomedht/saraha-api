import authController from './modules/auth/auth.controller.js';
import { connectionDB } from './DB/connection.js';
import userRouter from './modules/user/user.controller.js';
import { globalErrorHandling } from './util/error/error.handling.js'
import messageRouter from './modules/message/message.controller.js';
const bootstrap = (app, express) => {
    app.use(express.json())

    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
    })
    app.use("/auth", authController)
    app.use("/user", userRouter)
    app.use("/message", messageRouter)
    app.use(globalErrorHandling)

    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing" })
    })

    connectionDB()

}

export default bootstrap