import React from 'react'
import { RigidBody } from "@react-three/rapier"
import { Plane } from "@react-three/drei"


function Floor() {
  return (
      <RigidBody type='fixed'>
        <Plane
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          args={[100, 100]}
        >
          <meshStandardMaterial attach="material" color="lightgreen" />
        </Plane>
      </RigidBody>
  )
}

export default Floor