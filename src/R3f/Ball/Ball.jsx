import React from 'react'
import { RigidBody } from "@react-three/rapier"
import { Icosahedron } from "@react-three/drei"

const Ball = () => {
  return (
    <>
      <RigidBody colliders='hull'>
        <Icosahedron 
          position={[0,3,-3]} >
          <meshStandardMaterial attach="material" />
        </Icosahedron>
      </RigidBody>
    </>
  )
}

export default Ball
