import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import {handleError, handleSuccess} from "../../../utils/helper";



export function registerLaunchTools(server: McpServer) {
    // Get ERC20 token info
    server.tool(
        "get_price",
        "Query the price of a token",
        {
            token: z.string().describe("Token code")
        },
        async ({ token}) => {
            console.log("get_price callback", token)
            const result = {
                price:0,
            }
            try {
                return handleSuccess(result)
            } catch (error) {
                return handleError(error.message)
            }
        }
    )

    server.tool(
        "get_dddd_price",
        "Obtain the current price of DDDD tokens",
        { },
        async ({  }) => {
            console.log("get_dddd_price callback")
            try {
                return handleSuccess({})
            } catch (error) {
                return handleError(error.message)
            }
        }
    )
}