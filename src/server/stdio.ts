import "dotenv/config"

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import Logger from "@/utils/logger"
import { startServer } from "./base"

// Start the server
export const startStdioServer = async () => {
  try {
    const server = startServer()
    const transport = new StdioServerTransport()
    // using error level to show the message for stdio mode
    Logger.error("BNBChain MCP Server running on stdio mode")

    transport.onmessage = (message) => {
      Logger.error("Received message:", message)
    }
    transport.onclose = () => {
      Logger.error("Stdio server closed")
    }
    transport.onerror = (error) => {
      Logger.error("Stdio server error:", error)
    }

    await server.connect(transport)
    return server
  } catch (error) {
    Logger.error("Error starting BNBChain MCP Stdio server:", error)
  }
}
