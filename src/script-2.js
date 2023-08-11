import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'lil-gui'

//init 
const scene = new THREE.Scene()
const gui = new dat.GUI()
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


//textures and materials
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

const material = new THREE.MeshStandardMaterial()
const floorMaterial = new THREE.MeshStandardMaterial({color: 'grey'})

floorMaterial.side = THREE.DoubleSide

material.opacity = 0.9
material.side = THREE.DoubleSide
material.shininess = 10
material.metalness = 0.45
material.roughness = 0.65
material.specular = new THREE.Color(0x1188ff)
material.flatShading = true

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true
})
particlesMaterial.vertexColors = true


// adding meshes
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.castShadow = true
sphere.position.x = -1.5
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
floor.rotation.x = -1.5
floor.position.y = -1
floor.receiveShadow = true


//particles 
const particlesGeometry = new THREE.BufferGeometry(1, 32, 20)

const count = 1000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count *3)
for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    colors[i] = Math.random()
}


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

scene.add(sphere, torus, floor, particlesGeometry)



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

scene.add(spotLight, spotLight.target)

//GUI
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//ticks and event stuff

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
  })

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4

scene.add(camera)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
})

renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y = elapsedTime
    torus.rotation.x = elapsedTime
    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(sphere.position)

    particles.rotation.y =  elapsedTime * 0.2
    
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
