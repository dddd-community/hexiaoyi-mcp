import "dotenv/config"

import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import cors from "cors"
import express from "express"
import type { Request, Response } from "express"

import Logger from "@/utils/logger"
import { startServer } from "./base"
import {cmcHelperInstance} from "@/utils/cmc_helper.ts"

export const startSSEServer = async () => {
  try {
    const app = express()
    const server = startServer()
    app.use(cors())

    // Log the current log level on startup
    Logger.info(`Starting sse server with log level: ${Logger.getLevel()}`)

    // to support multiple simultaneous connections we have a lookup object from
    // sessionId to transport
    const transports: { [sessionId: string]: SSEServerTransport } = {}

    app.get("/sse", async (_: Request, res: Response) => {
      const transport = new SSEServerTransport("/messages", res)
      transports[transport.sessionId] = transport
      Logger.info("New SSE connection established", {
        sessionId: transport.sessionId
      })

      res.on("close", () => {
        Logger.info("SSE connection closed", { sessionId: transport.sessionId })
        delete transports[transport.sessionId]
      })

      try {
        await server.connect(transport)
      } catch (error) {
        Logger.error("Error connecting transport", {
          sessionId: transport.sessionId,
          error
        })
      }
    })

    app.post("/messages", async (req: Request, res: Response) => {
      const sessionId = req.query.sessionId as string
      const transport = transports[sessionId]

      if (transport) {
        Logger.debug("Handling message", { sessionId, body: req.body })
        try {
          await transport.handlePostMessage(req, res, req.body)
        } catch (error) {
          Logger.error("Error handling message", { sessionId, error })
          res.status(500).send("Internal server error")
        }
      } else {
        Logger.warn("No transport found for session", { sessionId })
        res.status(400).send("No transport found for sessionId")
      }
    })

    const intervalId = setInterval(async () => {
      const tokenPrice = await cmcHelperInstance.getTokenPriceByContractAddress("0x422cbee1289aae4422edd8ff56f6578701bb2878",56);
      if (tokenPrice !== null) {
        Object.values(transports).forEach((transport) => {
          transport.send({ jsonrpc: "2.0", method: "dddd_call", params: {"type":"getPrice","data":tokenPrice},id: Date.now()});
        });
      }
    }, 30000);

    const PORT = process.env.PORT || 3001
    const expressServer = app.listen(PORT, () => {
      Logger.info(
        `hexiaoyi MCP SSE Server is running on http://localhost:${PORT}`
      )
    })

    expressServer.on('close', () => {
      clearInterval(intervalId);
    });

    return server
  } catch (error) {
    Logger.error("Error starting hexiaoyi MCP SSE Server:", error)
  }
}
