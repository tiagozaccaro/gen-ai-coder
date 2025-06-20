import { Chat } from './components/chat/chat'

function App(): React.JSX.Element {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-background">
        <h1 className="text-2xl font-bold">Gen AI Coder</h1>
        <Chat />
      </div>
    </>
  )
}

export default App
