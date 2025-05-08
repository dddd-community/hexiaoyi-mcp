import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

//import { registerTokenPrompts } from "./prompts"
import { registerLaunchTools } from "./tools"

export function registerLaunch(server: McpServer) {
    registerLaunchTools(server)
    //registerTokenPrompts(server)
}