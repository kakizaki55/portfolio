import './App.css'
import Main from './R3f'
import { Canvas } from "@react-three/fiber"
import * as THREE from 'three'

function App() {
  // const [count, setCount] = useState(0)

  const cameraSettings = {
    fov: 75,
    // zoom: 75,
    near: 0.1,
    far: 200,
    position: [ 2, 2, 6 ]
}


  return (
    <>
      <Canvas
        // orthographic
        // flat
        // linear
        dpr={ .25 }
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          // outputColorSpace: THREE.LinearSRGBColorSpace
        }}
        camera={cameraSettings}  >
        <Main/>
      </Canvas>
    </>
  )
}

export default App
