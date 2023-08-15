import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'lil-gui'


const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/door-wood.jpeg',
    () =>
    {
        console.log('loading finished')
    },
    () =>
    {
        console.log('loading progressing')
    },
    () =>
    {
        console.log('loading error')
    })

texture.repeat.x = 2
texture.repeat.y = 2


// texture.minFilter = THREE.NearestFilter

const scene = new THREE.Scene()
const gui = new dat.GUI()

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// const box = new THREE.SphereGeometryGeometry(1, 1, 1, 3 ,3, 3)
// const sphere  = new THREE.SphereGeometry(1, 10, 10)
// const bufferGeometry = new THREE.BufferGeometry()
// const material = new THREE.MeshPhongMaterial()
// const material = new THREE.MeshToonMaterial()
const material = new THREE.MeshStandardMaterial()
const floorMaterial = new THREE.MeshStandardMaterial({color: 'grey'})
// floorMaterial.wireframe = true
// floorMaterial.metalness = 10
floorMaterial.side = THREE.DoubleSide
// floorMaterial.map = texture
// material.map = texture
// material.color = new THREE.Color('#ff0000')
// material.wireframe = true
// material.transparent = true
material.opacity = 0.9
// material.map = texture
material.side = THREE.DoubleSide
material.shininess = 10
material.metalness = 0.45
material.roughness = 0.65
material.specular = new THREE.Color(0x1188ff)
material.flatShading = true

// const boxMesh = new THREE.Mesh(box, material)
// const sphereMesh = new THREE.Mesh(sphere, material)

// gui.add(boxMesh.position, 'y')
// gui.add(boxMesh.position, 'x')
// gui
// .add(boxMesh.position, 'y')
// .min(- 3)
// .max(3)
// .step(0.01)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)
plane.castShadow = true

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5
torus.castShadow = true

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5, 10, 10),
  floorMaterial
)
// floor.rotation.y = 10
floor.rotation.x = -1.5
floor.position.y = -1
floor.receiveShadow = true

scene.add(sphere, plane, torus, floor)



/**Lighting */
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.x = 0
pointLight.position.y = 5
pointLight.position.z = 0
pointLight.intensity = 10

const bottomLight = new THREE.PointLight(0xffffff)
bottomLight.position.x = 0
bottomLight.position.y = -10
bottomLight.position.z = 0
bottomLight.intensity = 10
scene.add(pointLight, bottomLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1,0,1)
scene.add(directionalLight)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 5)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 10, 10, Math.PI * 0.1, 0.25, 1)
spotLight.target.position.x = 0
spotLight.position.set(-2, 2, 3 )
spotLight.castShadow = true
spotLight.shadow.radius = 5
spotLight.shadow.mapSize.width = 128
spotLight.shadow.mapSize.height = 128

// const spotLightCameraHelper  = new THREE.CameraHelper(spotLight.shadow.camera)
// scene.add(spotLightCameraHelper)

console.log('spotlight.shadow', spotLight.shadow)
scene.add(spotLight, spotLight.target)


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// const count = 10
// const positionsArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++)
// {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }


// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// bufferGeometry.setAttribute('position', positionsAttribute)

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
renderer.shadowMap.enabled = true
// renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y = elapsedTime
    plane.rotation.x = elapsedTime
    torus.rotation.x = elapsedTime
    // group.rotation.z =  elapsedTime
    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(plane.position)
    
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
