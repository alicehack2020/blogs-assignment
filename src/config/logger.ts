import winston from "winston"
import { Config } from "."

const logger = winston.createLogger({
    level: "info",
    defaultMeta: { service: "auth-service" },

    transports: [
        new winston.transports.File({
            level: "info",
            silent: Config.NODE_ENV === "dev",
            dirname: "logs",
            filename: "combine.log",
        }),
        new winston.transports.File({
            level: "error",
            silent: Config.NODE_ENV === "dev",
            dirname: "logs",
            filename: "errror.log",
        }),

        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
})

if (Config.NODE_ENV !== "dev") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        })
    )
}

export default logger
