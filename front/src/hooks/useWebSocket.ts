import { useCallback, useEffect, useState } from "react";



export function useWebSocket<T>(url: string) {
   const [ws, setWs] = useState<WebSocket | null>(null)
   const [connected, setConnected] = useState(false)
   const [error, setError] = useState<Error | null>(null)
   const [data, setData] = useState<T | null>(null)
   const send = useCallback((message: string) => {
      if (!ws) {
         console.error('WebSocket is not connected')
         return
      }
      ws.send(message)
   }, [ws])
   useEffect(() => {
      const ws = new WebSocket(url)
      setWs(ws)
      ws.onopen = () => setConnected(true)
      ws.onerror = (e) => {
         setConnected(false)
         setError(new Error(e.type))
      }
      ws.onmessage = (e) => {
         setData(JSON.parse(e.data))
      }
      return () => {
         ws.close()
         setConnected(false)
      }
   }, [url])

   return {
      connected,
      send,
      close: () => {
         if (ws) {
            ws.close()
            setConnected(false)
         }
      },
      error,
      data
   }
}