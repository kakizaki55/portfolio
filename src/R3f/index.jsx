import React, { useRef }from 'react'
import CameraController from "./CameraController/CameraController";
import { useFrame } from "@react-three/fiber";
import CustomObject from "./CustomObject/CustomObject";




const Main = () =>  {

  const cubeRef = useRef()
  const groupRef = useRef()

  useFrame((state, delta) => {
    cubeRef.current.rotation.x += delta
    groupRef.current.rotation.y += delta

    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle + 2)* 6
    // state.camera.position.z = Math.cos(angle)* 6
    // state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <CameraController/>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={ 0.1 } />
      <CustomObject/>
      <group ref={ groupRef }>
          <mesh position-x={ - 2 }>
              <sphereGeometry />
              <meshStandardMaterial color="orange" />
          </mesh>
          <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
              <boxGeometry />
              <meshStandardMaterial color="mediumpurple"  />
          </mesh>
      </group>

      <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}

export default Main
