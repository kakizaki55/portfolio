import React from 'react'
import { RigidBody } from "@react-three/rapier"

const Ball = (props) => {
  return (
    <>
    <RigidBody colliders='hull'>
      <mesh {...props}>
        <sphereGeometry arg={[1,1,4]}/>
        <meshNormalMaterial/>
      </mesh>
    </RigidBody>

    </>
  )
}

export default Ball
