import React, { useRef }from 'react'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial ,TransformControls, OrbitControls, PivotControls, Html, Text, Float, useHelper } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import CustomObject from "./CustomObject/CustomObject";
import './index.css'





const Main = () =>  {

  const cubeRef = useRef()
  const sphereRef = useRef()
  const groupRef = useRef()

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

  const { scale } = useControls('cube', {
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
    cubeRef.current.rotation.x += delta
    groupRef.current.rotation.y += delta

    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle + 2)* 6
    // state.camera.position.z = Math.cos(angle)* 6
    // state.camera.lookAt(0, 0, 0)
  })



  return (
    <>
      { perfVisible && <Perf position="top-left" /> }
      <OrbitControls makeDefault />
      <directionalLight 
        ref={directionalLight} 
        position={[2,1,2]}
        castShadow
        intensity={ 1.5 }
        shadow-mapSize={ [ 1024, 1024 ] }/>
      <ambientLight intensity={ 0.1 } />
      <CustomObject/>
          <group ref={ groupRef }>
              {/* <PivotControls anchor={[0,0,0]} depthTest={ false }> */}
                <mesh
                  ref={ sphereRef }
                  position={[position.x, position.y, 0]}
                  visible={ visible }
                  scale={scale}
                  castShadow >
                    <sphereGeometry/>
                    <meshStandardMaterial color={color} />
                    <Html
                        position={ [ 1, 1, 0 ] }
                        wrapperClass="label"
                        center
                        distanceFactor={ 8 }
                        // occlude={[ sphereRef, cubeRef ]}
                    >
                        That's a sphere 👍
                    </Html>
                </mesh>
              {/* </PivotControls> */}
                <mesh
                  ref={ cubeRef }
                  position-x={ 2 }
                  scale={ 1.5 }
                  castShadow >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple"  />
                </mesh>
          </group>
          {/* <Float
            speed={ 5 }>
            <Text
              font="./bangers-v20-latin-regular.woff"
              fontSize={ 3 }
              color="salmon"
              position={[1,1,0]}>
                this is some text
              <meshNormalMaterial />
            </Text>
          </Float> */}
      {/* <TransformControls object={ cubeRef } mode="rotate">
      </TransformControls> */}

      <mesh 
        position-y={ - 1 } 
        rotation-x={ - Math.PI * 0.5 } 
        scale={ 10 } 
        receiveShadow>
          <planeGeometry />
          <MeshReflectorMaterial
            color='lightgreen'
            resolution={ 512 }
            blur={ [ 1000, 1000 ] }
            mixBlur={ 1 }
            mirror={ 0.5 }/>
      </mesh>
    </>
  )
}

export default Main
