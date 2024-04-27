import { Config } from "./config"
import app from "./app"
import logger from "./config/logger"

const StartServer = () => {
    const PORT = Config.PORT

    try {
        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`)
        })
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error)
            setTimeout(() => {
                process.exit(1)
            }, 1000)
        }
    }
}

StartServer()
