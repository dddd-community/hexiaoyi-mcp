"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
//import { registerEVM } from "@/evm/index.js"
var logger_1 = require("@/utils/logger");
// Create and start the MCP server
var startServer = function () {
    try {
        // Create a new MCP server instance
        var server = new mcp_js_1.McpServer({
            name: "BNBChain MCP Server",
            version: "1.0.0"
        });
        // Register all resources, tools, and prompts
        //registerEVM(server)
        return server;
    }
    catch (error) {
        logger_1.logger.error("Failed to initialize server:", error);
        process.exit(1);
    }
};
exports.startServer = startServer;
