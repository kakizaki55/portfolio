import React from 'react'
import { useGLTF } from "@react-three/drei"

const Grass = () => {
  const grass = useGLTF('/grass_pack/scene.gltf')
  console.log('grass', grass)

  const count = 20

  
  return (
    <>  
        <mesh >
          <primitive
            object={ grass.scene }
            scale={ 0.02 }
            position={[2,-1,0]}
            />
        </mesh>
        <mesh >
          <primitive
            object={ grass.scene }
            scale={ 0.02 }
            position={[0,-1,2]}
            />
        </mesh>
        <mesh >
          <primitive
            object={ grass.scene }
            scale={ 0.02 }
            position={[4,-1,0]}
            />
        </mesh>
        <mesh >
          <primitive
            object={ grass.scene }
            scale={ 0.02 }
            position={[2,-1,3]}
            />
        </mesh>
        <mesh >
          <primitive
            object={ grass.scene }
            scale={ 0.02 }
            position={[1,-1,2]}
            />
        </mesh>
    </>
  )
}

export default Grass