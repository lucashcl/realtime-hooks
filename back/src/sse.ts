import { randomUUIDv7 } from "bun"
import { Hono } from "hono"
import { streamSSE } from 'hono/streaming'

export const sse = new Hono()

sse.get('/', (c) => {
   return streamSSE(c, async (stream) => {
      c.var
      while (true) {
         await stream.writeSSE({
            data: new Date().toISOString(),
            id: randomUUIDv7(),
         })
         await stream.sleep(1000)
      }
   })
})