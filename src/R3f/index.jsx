import React, { useRef }from 'react'
import './index.css'
import * as THREE from 'three'
import {  OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Fox from "./Fox/Fox";
import Ball from './Ball/Ball.jsx'
import Floor from './Floor/Floor'
import SpaceDust from "./SpaceDust/SpaceDust"





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
        intensity={ 1.5 } />
      <ambientLight intensity={ 0.1 } />
      {/* <fog attach="fog" args={["grey", 0, 40]} /> */}
      {/* <SpaceDust /> */}
      <Physics
        //debug
        timeStep='vary' >
        <Floor />
        <Fox orbitControls={orbitControls}/>
        <Ball position={[3, 2, 2]} />
      </Physics>
    </>
  )
}

export default Main
