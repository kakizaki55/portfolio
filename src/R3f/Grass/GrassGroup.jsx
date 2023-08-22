import React from 'react'
import Grass from './Grass'

const GrassGroup = () => {

  const grassCount = 100

  return (
    <>
    { Array(grassCount)
        .fill(true)
        .map((item, index) => (
          <Grass key={index} />
        ))}
    </>
  )
}

export default GrassGroup