import React, { useRef }from 'react'
import CameraController from "./CameraController/CameraController";
import { useFrame } from "@react-three/fiber";




const Main = () =>  {

  const cubeRef = useRef()
  const groupRef = useRef()

  useFrame((state, delta) => {
    console.log( delta)
    cubeRef.current.rotation.x += delta
    groupRef.current.rotation.y += delta
  })

  return (
    <>
      <CameraController/>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={ 0.1 } />
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
