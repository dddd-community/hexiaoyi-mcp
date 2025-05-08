import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { registerEVM } from "../blockchain"
import {logger} from "../utils/logger";


// Create and start the MCP server
export const startServer = () => {
    try {
        // Create a new MCP server instance
        const server = new McpServer({
            name: "BlockChain MCP Server",
            version: "1.0.0"
        })

        // Register all resources, tools, and prompts
        registerEVM(server)
        return server
    } catch (error) {
        logger.error("Failed to initialize server:", error)
        process.exit(1)
    }
}