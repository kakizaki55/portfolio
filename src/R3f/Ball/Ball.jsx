import React from 'react'
import { RigidBody } from "@react-three/rapier"
import { Sphere } from "@react-three/drei"

const Ball = (props) => {
  return (
    <>
      <RigidBody colliders='hull'>
        <Sphere 
          position={[0,3,-3]}>
          <meshStandardMaterial attach="material" />
        </Sphere>
      </RigidBody>
    </>
  )
}

export default Ball
