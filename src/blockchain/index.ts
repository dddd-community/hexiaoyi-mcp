import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import {registerLaunch} from "./modules/launch";

export function registerEVM(server: McpServer) {

    registerLaunch(server)
}