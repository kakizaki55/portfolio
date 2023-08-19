import { useGLTF } from "@react-three/drei"
import { useAnimations, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useControls } from 'leva'
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { KeyDisplay } from '../../Controller/utils/KeyDisplay';

const Fox = (props) => {

  const fox = useGLTF('./fox/glTF/Fox.gltf')

  const animations = useAnimations(fox.animations, fox.scene)
  const [subscribeKeys, getKeys] = useKeyboardControls()
  
  const foxRef = useRef()
  const foxBodyRef = useRef()

  const [orientation, setOrientation] = useState(Math.PI);
  const [animationName, setAnimationName] = useState("Survey");
  

  //debugging controller
  // const { animationName } = useControls('fox', {
  //   animationName: { options: animations.names }
  // })
  const { speed } = useControls("Character", {
    speed: { value: 130, min: 130, max: 500, step: 5 } // Current speed of the model
  });
  
  
  useFrame((state, delta) => {
    // retrieve keys
    const keys = getKeys();
    let { forward, back, left, right } = keys;

    
    // Keys pressed counter 
    const nbOfKeysPressed = Object.values(keys).filter((value) => value).length
    if (forward && back && nbOfKeysPressed === 2) forward = false;
    if (left && right && nbOfKeysPressed === 2) left = false;

    //setting animations
    setAnimationName(nbOfKeysPressed === 0 ? "Survey" : "Walk");

    /**w
     * Model movement
     */
    const linvelY = foxBodyRef.current.linvel().y;
    
    // Reduce speed value if it's diagonal movement to always keep the same speed
    const normalizedSpeed = nbOfKeysPressed == 1 ? speed * delta : Math.sqrt(2) * (speed / 2) * delta;

    const impulse = {
      x: left ? -normalizedSpeed : right ? normalizedSpeed : 0,
      y: linvelY,
      z: forward ? -normalizedSpeed : back ? normalizedSpeed : 0
    };

    // Set model currennt linear velocity    
    foxBodyRef.current.setLinvel(impulse);

    /**
     * Model orentations
     */
    const angle = Math.PI / 4 / 7; // rotation normalizedSpeed (more divided => more smooth)
    
    const topLeftAngle = 3.927; // (225 * Math.PI / 180).toFixed(3)

    const bottomLeftAngle = 5.498; // (315 * Math.PI / 180).toFixed(3)
    
    const topRightAngle = 2.356; // (135 * Math.PI / 180).toFixed(3)

    const bottomRightAngle = 0.785; // (45 * Math.PI / 180).toFixed(3)
    
    let aTanAngle = Math.atan2(Math.sin(orientation), Math.cos(orientation));
    aTanAngle = aTanAngle < 0 ? aTanAngle + Math.PI * 2 : aTanAngle;
    aTanAngle = Number(aTanAngle.toFixed(3));
    aTanAngle = aTanAngle == 0 ? Number((Math.PI * 2).toFixed(3)) : aTanAngle;
    
    const keysCombinations = {
      forwardRight: forward && !back && !left && right,
      forwardLeft: forward && !back && left && !right,
      backRight: !forward && back && !left && right,
      backLeft: !forward && back && left && !right,
      forward: forward && !back && !left && !right,
      right: !forward && !back && !left && right,
      back: !forward && back && !left && !right,
      left: !forward && !back && left && !right
    };
    
    // Forward-Rightward
      if (keysCombinations.forwardRight && aTanAngle != topRightAngle) {
        setOrientation((prevState) => prevState + angle * (aTanAngle > topRightAngle ? -1 : 1)
          );
      }
      
      // Forward-Leftward
      if (keysCombinations.forwardLeft && aTanAngle != topLeftAngle) {
        setOrientation((prevState) => prevState + angle * (aTanAngle > topLeftAngle ? -1 : 1));
        }
      
      // Backward-Rightward
      if (keysCombinations.backRight && aTanAngle != bottomRightAngle) {
        setOrientation(
          (prevState) =>
          prevState +
          angle *
          (aTanAngle > bottomRightAngle && aTanAngle < topLeftAngle ? -1 : 1)
          );
        }
        
      // Backward-Leftward
      if (keysCombinations.backLeft && aTanAngle != bottomLeftAngle) {
        setOrientation(
          (prevState) =>
          prevState +
          angle *
          (aTanAngle < topRightAngle || aTanAngle > bottomLeftAngle ? -1 : 1)
          );
        }
          
          // Rightward
          if (keysCombinations.right && Math.sin(orientation) != 1) {
            setOrientation(
              (prevState) => prevState + angle * (Math.cos(orientation) > 0 ? 1 : -1)
              );
            }
            
            // Leftward
            if (keysCombinations.left && Math.sin(orientation) != -1) {
              setOrientation(
                (prevState) => prevState + angle * (Math.cos(orientation) > 0 ? -1 : 1)
                );
              }
              
              // Forward
              if (keysCombinations.forward && Math.cos(orientation) != -1) {
                setOrientation(
                  (prevState) => prevState + angle * (Math.sin(orientation) > 0 ? 1 : -1)
                  );
                }
                
                // Backward
                if (keysCombinations.back && Math.cos(orientation) != 1) {
                  setOrientation(
                    (prevState) => prevState + angle * (Math.sin(orientation) > 0 ? -1 : 1)
                    );
                  }
                  
    // Lock X and Z model rotations and update rotation Y
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(new THREE.Euler(0, orientation, 0));
    foxBodyRef.current.setRotation(quaternionRotation);
    
    
    //Camera Movement 
    if (!props.orbitControls) {
      const foxPosition = foxBodyRef.current.translation();
      
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(foxPosition);
      cameraPosition.z += 10;
      cameraPosition.y += 5;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(foxPosition);
      cameraTarget.y += 0.4;
      
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cameraTarget);
    }


    //Animation
    // if(forward || back || left || right){
    //   const action = animations.actions.walk
    //   action.reset().fadeIn(0.5).play()
    // } 

  });
  
  useEffect(()=> {
    //animation
    animations.actions[animationName].fadeIn(.2).play();
    console.log('animationName', animationName)
    
    // Key Display
    const keyDisplayQueue = new KeyDisplay();
    document.addEventListener('keydown', (event) => {
        keyDisplayQueue.down(event.key)
        // if (event.shiftKey && characterControls) {
        //     characterControls.switchRunToggle()
        // } else {
        //     (keysPressed)[event.key.toLowerCase()] = true
        // }
    }, false);
    document.addEventListener('keyup', (event) => {
        keyDisplayQueue.up(event.key);
        // (keysPressed)[event.key.toLowerCase()] = false
    }, false);

    return () => {
      setTimeout(()=> {
        animations.actions[animationName].fadeOut(.2).stop()
      },200)
    }
  },[animationName])
  
  return (
    <>
      <RigidBody 
        ref={ foxBodyRef }>
        <mesh 
          ref={foxRef} >
          <primitive
            ref={ foxRef }
            object={ fox.scene }
            scale={ 0.02 }
            />
        </mesh>
      </RigidBody>
    </>
  )
}


export default Fox
