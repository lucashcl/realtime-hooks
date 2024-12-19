import { useEffect } from 'react'
// import { useSSE } from './hooks/useSSE'
import { useWebSocket } from './hooks/useWebSocket'

type message = {
  id: string
  time: string
  data: string
}

function App() {
  // const { data, error, connected, close } = useSSE("http://localhost:3000/sse")
  const { data, error, connected, close, send } = useWebSocket<message[]>("ws://localhost:3000/ws")
  useEffect(() => {
    if (error) {
      // alert('An error occurred')
      console.error(error)
    }
  }, [error])
  return (
    <>
      <p>status: {connected ? "connected" : "not connected"}</p>
      <button onClick={() => send('ping')} type='button'>Send</button>
      <button onClick={() => send('%clear%')} type='button'>Clear</button>
      <button onClick={close} type='button'>Close</button>
      <p>message:</p>
      <ul>
        {data?.map(({ id, data, time }) => <li key={id}>{new Date(time).toLocaleTimeString()} - {data}</li>)}
      </ul>
    </>
  )
}

export default App
