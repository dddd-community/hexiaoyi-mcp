import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import {handleError, handleSuccess} from "../../../utils/helper";



export function registerLaunchTools(server: McpServer) {
    // Get ERC20 token info
    server.tool(
        "new_launch",
        "Launch a new token",
        {
            name: z.string().describe("Token name"),
            symbol: z.string().describe("Token symbol"),
            totalSupply: z.number().positive().describe("Total supply")
        },
        async ({ name, symbol, totalSupply }) => {
            console.log("new_launch callback", name, symbol, totalSupply)
            const result = {
                ca:"0x422cbee1289aae4422edd8ff56f6578701bb2878",
                name:name,
                symbol:symbol,
                totalSupply:totalSupply
            }
            try {
                return handleSuccess(result);
            } catch (error) {
                return handleError(error.message);
            }
        }
    )
}