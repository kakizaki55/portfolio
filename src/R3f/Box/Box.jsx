import React from 'react'
import { RigidBody } from "@react-three/rapier"
import { RoundedBox } from "@react-three/drei"

const Box = () => {
  return (
    <>
      <RigidBody colliders='hull'>
        <RoundedBox 
          position={[0,4,-3]} >
          <meshStandardMaterial attach="material" />
        </RoundedBox>
      </RigidBody>
    </>
  )
}

export default Box