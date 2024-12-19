import { randomUUIDv7 } from "bun"
import { Hono } from "hono"
import { streamSSE } from 'hono/streaming'

import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'

export const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

type message = {
   id: string
   time: string
   data: string
}

let data = [] as message[]

export const ws = new Hono()

ws.get('/', upgradeWebSocket(c => {
   return {
      onMessage(evt, ws) {
         if (evt.data === '%clear%') {
            data = []
            return ws.send(JSON.stringify(data))
         }
         data.push({
            id: randomUUIDv7(),
            time: new Date().toISOString(),
            data: evt.data.toString(),
         })
         data.push({
            id: randomUUIDv7(),
            time: new Date().toISOString(),
            data: "pong",
         })
         console.log(evt.data)
         ws.send(JSON.stringify(data))
      },
      onClose() {
         console.log('closed')
      },
   }
}))