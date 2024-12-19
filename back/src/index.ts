import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sse } from './sse'
import { websocket, ws } from './ws'

const app = new Hono()

app.use(cors({
  origin: "http://localhost:5173",
}))

app.route("/sse", sse)
app.route("/ws", ws)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default {
  fetch: app.fetch,
  websocket
}
