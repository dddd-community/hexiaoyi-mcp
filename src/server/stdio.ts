import "dotenv/config"

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import Logger_util from "@/utils/logger_util.ts"
import { startServer } from "./base"

// Start the server
export const startStdioServer = async () => {
  try {
    const server = startServer()
    const transport = new StdioServerTransport()
    // using error level to show the message for stdio mode
    Logger_util.error("he xiao yi mcp server running on stdio mode")

    transport.onmessage = (message) => {
      Logger_util.error("received message:", message)
    }
    transport.onclose = () => {
      Logger_util.error("stdio server closed")
    }
    transport.onerror = (error) => {
      Logger_util.error("stdio server error:", error)
    }

    await server.connect(transport)
    return server
  } catch (error) {
    Logger_util.error("error starting mcp stdio server:", error)
  }
}
