import { useCallback, useEffect, useState } from "react";

export function useSSE(url: string) {
   const [connected, setConnected] = useState(false)
   const [error, setError] = useState<Error | null>(null)
   const [eventSource, setEventSource] = useState<EventSource | null>(null)
   const [data, setData] = useState<string | null>(null)

   const close = useCallback(() => {
      if (eventSource) {
         eventSource.close()
         setConnected(false)
      }
   }, [eventSource])

   useEffect(() => {
      const event = new EventSource(url)
      setEventSource(event)

      event.onopen = () => setConnected(true)
      event.onerror = (e) => {
         setConnected(false)
         setError(new Error(e.type))
      }

      event.onmessage = (e) => {
         setData(e.data)
         console.log(e)
      }
      return () => event.close()
   }, [url])

   return {
      connected,
      close,
      error,
      data
   }
}