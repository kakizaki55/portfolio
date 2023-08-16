import './App.css'
import Main from './R3f'
import { Canvas } from "@react-three/fiber"
import * as THREE from 'three'
import  Controller  from './Controller/Controller'


function App() {
  // const [count, setCount] = useState(0)

  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 2.5, 4, 6 ]
}


  return (
    <>
      <Controller>
        <Canvas
          // orthographic
          dpr={ .25}
          gl={{
            antialias: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            // outputColorSpace: THREE.LinearSRGBColorSpace
          }}
          camera={cameraSettings}  >
            <Main/>
        </Canvas>
      </Controller>
    </>
  )
}

export default App
