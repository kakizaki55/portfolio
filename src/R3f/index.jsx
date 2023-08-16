import React, { useRef }from 'react'
import './index.css'
import * as THREE from 'three'
import { MeshReflectorMaterial , OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import Fox from "./Fox/Fox";
import Ball from './Ball/Ball.jsx'





const Main = () =>  {

  const { perfVisible } = useControls({
    perfVisible: true
  })

  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  const { orbitControls } = useControls("Debug", {
    orbitControls: false,
    debug: true
  });



  return (
    <>

      { perfVisible && <Perf position="top-left" /> }
      { orbitControls && <OrbitControls makeDefault />}
      {/* { debug && <Debug />} */}

      <directionalLight
        ref={directionalLight}
        position={[5,2,5]}
        castShadow
        intensity={ 1.5 }
        shadow-mapSize={ [ 1024, 1024 ] }/>
      <ambientLight intensity={ 0.1 } />
      <Physics debug timeStep='vary' >
        <RigidBody type='fixed'>
          <mesh 
            position-y={ - 1 } 
            rotation-x={ - Math.PI * 0.5 } 
            scale={ 10 } 
            receiveShadow>
              <planeGeometry args={[5, 5, 5]}/>
              <MeshReflectorMaterial
                color='lightgreen'
                resolution={ 512 }
                blur={ [ 1000, 1000 ] }
                mixBlur={ 1 }
                mirror={ 0.5 }/>
          </mesh>
        </RigidBody>
        <Fox orbitControls={orbitControls}/>
        <Ball position={[3, 2, 2]}  />
      </Physics>
    </>
  )
}

export default Main
