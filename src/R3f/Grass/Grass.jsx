import React from 'react'
import { useGLTF, Clone } from "@react-three/drei"
import  getRandomInt from '../utils/math-utils'
import * as THREE from "three"

const Grass = () => {
  const grass = useGLTF('/grass_pack/scene.gltf')

  const position = {
      x: getRandomInt(-10,10),
      y: -1,
      z: getRandomInt(-10,10)
    } 
  const rotation = {
    y: getRandomInt(0, 100)
  }

  const color = {
    r:getRandomInt(0,100),
    g:getRandomInt(75, 255),
    b:getRandomInt(0, 20),
  }

  return (
    <>  
      <mesh >
        <Clone
          object={ grass.scene }
          scale={ 0.05 }
          position={[position.x, position.y, position.z]}
          rotation={[0, rotation.y, 0]}
          inject={<meshBasicMaterial color={new THREE.Color(`rgb(${color.r}, ${color.g}, ${color.b})`)}/>}
          />
      </mesh>
      {/* <GrassGroup/> */}
    </>
  )
}

export default Grass