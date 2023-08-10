import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const box = new THREE.BoxGeometry(1, 1, 1, 3 ,3, 3)
const sphere  = new THREE.SphereGeometry(1, 10, 10)
const bufferGeometry = new THREE.BufferGeometry()
const material = new THREE.MeshBasicMaterial({color: 'purple', wireframe: true})

const mesh = new THREE.Mesh(bufferGeometry, material)


const count = 10
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}


const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
bufferGeometry.setAttribute('position', positionsAttribute)

// mesh.position.x = -0.7
// mesh.position.y = -0.5
// mesh.position.z = .04

// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 2

// mesh.rotation.x = Math.PI * 0.0
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25


// const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube1.position.x = - 1.5
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 'pink' })
// )
// cube2.position.x = 0
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 'grey' })
// )
// cube3.position.x = 1.5
// group.add(cube3)

scene.add(mesh)



const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
  })

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
})

renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime
    // group.rotation.z =  elapsedTime
    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(mesh.position)
    
    //  Render
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
  }
tick()


window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    const canvas = document.querySelector('canvas.webgl')

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
