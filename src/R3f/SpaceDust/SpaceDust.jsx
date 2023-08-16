import React , { useMemo, useRef }from 'react'

const count = 100

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const SpaceDust = () => {

  const spaceDustRef = useRef()
  const lightRef = useRef()

  const particles = useMemo(() => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    const time = getRandomArbitrary(0, 100);
    const factor = getRandomArbitrary(20, 120);
    const speed = getRandomArbitrary(0.01, 0.015) / 2;
    const x = getRandomArbitrary(-50, 50);
    const y = getRandomArbitrary(-50, 50);
    const z = getRandomArbitrary(-50, 50);

    temp.push({ time, factor, speed, x, y, z });
  }
  return temp;
}, [count]);

console.log('particles', particles)

  return (
      <>
        <pointLight ref={lightRef} distance={40} intensity={8} color="lightblue" />
        <instancedMesh ref={spaceDustRef} args={[null, null, count]}>
          <dodecahedronBufferGeometry args={[0.2, 0]} />
          <meshPhongMaterial color="#050505" />
        </instancedMesh>
      </>
  )
}

export default SpaceDust