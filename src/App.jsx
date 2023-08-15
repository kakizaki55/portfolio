import './App.css'
import Main from './R3f'
import { Canvas } from "@react-three/fiber"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Canvas>
        <Main/>
      </Canvas>
    </>
  )
}

export default App
