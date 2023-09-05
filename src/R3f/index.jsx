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
import Box from "./Box/Box";
import GrassGroup from "./Grass/GrassGroup";





const Main = () =>  {

  const { perfVisible } = useControls({
    perfVisible: true
  })

  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  const { orbitControls } = useControls("Debug", {
    orbitControls: false,
    // debug: true
  });



  return (
    <>

      { perfVisible && <Perf position="top-left" /> }
      { orbitControls && <OrbitControls makeDefault />}
      {/* { debug && <Debug />} */}
      <Physics
        //debug
        // timeStep='vary' 
        >
      <directionalLight
        ref={directionalLight}
        position={[5,2,5]}
        intensity={ 1.5 } />
      <ambientLight intensity={ 0.1 } />
        <Floor />
        <GrassGroup />
        <Fox orbitControls={orbitControls}/>
        <Ball position={[3, 2, 2]} />
        <Box />
      </Physics>
    </>
  )
}

export default Main
