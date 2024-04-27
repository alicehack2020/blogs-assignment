/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express"
import logger from "./config/logger"
import { HttpError } from "http-errors"
import blogsRouter from "./routes/blogsRouter"
const app = express()
app.use(express.json())

app.get("/", async (req, res) => {
    res.status(200).send({ welcocom: "welcome" })
})

app.use("/api", blogsRouter)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    })
})

export default app
