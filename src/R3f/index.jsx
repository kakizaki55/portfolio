import React, { useRef }from 'react'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial , OrbitControls, useHelper } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import Fox from "./Fox/Fox";
import { Physics, RigidBody } from "@react-three/rapier";
import './index.css'





const Main = () =>  {

  // const cubeRef = useRef()
  const sphereRef = useRef()
  // const groupRef = useRef()

  const { position, color, visible, clickMe } = useControls({
    position: {
      value:{ x:-2, y:0},
      step: 0.01,
      joystick: 'invertY',
    },
    color: 'red',
    visible: true,
    clickMe: button(() => { console.log('ok') }),
    choice: { options: [ 'a', 'b', 'c' ] }
  })

  const { scale } = useControls('sphere', {
    scale:
    {
        value: 1.5,
        step: 0.01,
        min: 0,
        max: 5
    }
  })

  const { perfVisible } = useControls({
    perfVisible: true
  })

  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  useFrame((state, delta) => {
    // cubeRef.current.rotation.x += delta
    // groupRef.current.rotation.y += delta

    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle + 2)* 6
    // state.camera.position.z = Math.cos(angle)* 6
    // state.camera.lookAt(0, 0, 0)
  })

  // const clickHandler = (event) => {
  //   console.log('event', event)
  //   sphereRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
  // }

  const { orbitControls } = useControls("Debug", {
    orbitControls: true,
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
      </Physics>
    </>
  )
}

export default Main
