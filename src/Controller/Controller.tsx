import { useMemo } from 'react'
import { KeyboardControls } from "@react-three/drei"

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}
const Controller = ({ children }: never) => {


  const map = useMemo(()=>[
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ], [])

  return (
    <KeyboardControls map={map}>
      {children}
    </KeyboardControls>
  )
}



export default Controller