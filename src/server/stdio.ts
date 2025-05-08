import "dotenv/config"

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"


import { startServer } from "./base"
import {logger} from "../utils/logger";

// Start the server
export const startStdioServer = async () => {
    try {
        const server = startServer()
        const transport = new StdioServerTransport()
        // using error level to show the message for stdio mode
        logger.error("BlockChain MCP Server running on stdio mode")

        transport.onmessage = (message) => {
            logger.error("Received message:", message)
        }
        transport.onclose = () => {
            logger.error("Stdio server closed")
        }
        transport.onerror = (error) => {
            logger.error("Stdio server error:", error)
        }

        await server.connect(transport)
        return server
    } catch (error) {
        logger.error("Error starting BlockChain MCP Stdio server:", error)
    }
}