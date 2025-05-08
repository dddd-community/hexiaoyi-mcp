import "dotenv/config"

import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import cors from "cors"
import express from "express"
import type { Request, Response } from "express"


import { startServer } from "./base"
import {logger} from "../utils/logger";

export const startSSEServer = async () => {
    try {
        const app = express()
        const server = startServer()
        app.use(cors())

        // Log the current log level on startup
        logger.info(`Starting sse server`)

        // to support multiple simultaneous connections we have a lookup object from
        // sessionId to transport
        const transports: { [sessionId: string]: SSEServerTransport } = {}

        app.get("/sse", async (_: Request, res: Response) => {
            const transport = new SSEServerTransport("/messages", res)
            transports[transport.sessionId] = transport
            logger.info("New SSE connection established", {
                sessionId: transport.sessionId
            })

            res.on("close", () => {
                logger.info("SSE connection closed", { sessionId: transport.sessionId })
                delete transports[transport.sessionId]
            })

            try {
                await server.connect(transport)
            } catch (error) {
                logger.error("Error connecting transport", {
                    sessionId: transport.sessionId,
                    error
                })
            }
        })

        app.post("/messages", async (req: Request, res: Response) => {
            const sessionId = req.query.sessionId as string
            const transport = transports[sessionId]

            if (transport) {
                logger.debug("Handling message", { sessionId, body: req.body })
                try {
                    await transport.handlePostMessage(req, res)
                } catch (error) {
                    logger.error("Error handling message", { sessionId, error })
                    res.status(500).send("Internal server error")
                }
            } else {
                logger.warn("No transport found for session", { sessionId })
                res.status(400).send("No transport found for sessionId")
            }
        })

        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            logger.info(
                `BlockChain MCP SSE Server is running on http://localhost:${PORT}`
            )
        })
        return server
    } catch (error) {
        logger.error("Error starting BlockChain MCP SSE Server:", error)
    }
}