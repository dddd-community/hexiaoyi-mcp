import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { registerEVM } from "@/evm/index.js"
import { registerGnfd } from "@/gnfd/index.js"
import Logger_util from "@/utils/logger_util.js"

// Create and start the MCP server
export const startServer = () => {
  try {
    // Create a new MCP server instance
    const server = new McpServer({
      name: "he xiao yi mcp server",
      version: "1.0.0"
    })

    // Register all resources, tools, and prompts
    registerEVM(server)
    registerGnfd(server)
    return server
  } catch (error) {
    Logger_util.error("failed to initialize server:", error)
    process.exit(1)
  }
}
