import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Lights from './lights'
import Helper from './helper'
import OrbitCamera from './camera'
import Geometry from './geometry'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#222222')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const lights = new Lights({ scene })
lights.setup()
const helper = new Helper({ scene })
helper.setup()
const geometry = new Geometry({ scene })
geometry.setup()

const orbitCamera = new OrbitCamera({ scene })
const controls = new OrbitControls(orbitCamera.camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, orbitCamera.camera)
  controls.update()
}

// Add raycaster
const rollOverGeo = new THREE.BoxGeometry(1.0001, 1.0001, 1.0001)
const rollOverMaterial = new THREE.MeshBasicMaterial({
  color: 'gray',
  opacity: 0.2,
  transparent: true,
  wireframe: false,
})
const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
rollOverMesh.position.set(0.5, 0.5, 0.5)
rollOverMesh.visible = false
scene.add(rollOverMesh)

function onWindowResize() {
  orbitCamera.camera.aspect = window.innerWidth / window.innerHeight
  orbitCamera.camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let MODE = 'add'

function checkIntersection(event, updatePointer = true) {
  if (updatePointer) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
  }

  raycaster.setFromCamera(pointer, orbitCamera.camera)

  const intersects = raycaster.intersectObjects(geometry.cubes, true)
  console.log(intersects)

  if (intersects.length > 0) {
    const intersect = intersects[0]
    rollOverMesh.position.copy(intersect.object.position)
    if (MODE === 'add') {
      rollOverMesh.position.add(intersect.face.normal)
    }

    rollOverMesh.visible = true
  } else {
    rollOverMesh.visible = false
  }
  animate()
}

function onPointerMove(event) {
  checkIntersection(event)
}

function onPointerDown(event) {
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)

  raycaster.setFromCamera(pointer, orbitCamera.camera)

  const intersects = raycaster.intersectObjects(geometry.cubes, true)

  if (intersects.length > 0) {
    const intersect = intersects[0]

    if (MODE === 'remove') {
      geometry.cubes.splice(geometry.cubes.indexOf(intersect.object), 1)
      scene.remove(intersect.object)
    } else if (MODE === 'add') {
      const voxel = geometry.createCube()
      voxel.position.copy(intersect.object.position).add(intersect.face.normal)
      geometry.cubes.splice(0, 0, voxel)
      scene.add(voxel)
      intersects.splice(0, 0, voxel)
    }
    scene.updateMatrixWorld(true)

    checkIntersection(event)
  }
}

document.addEventListener('pointermove', onPointerMove)
document.addEventListener('pointerdown', onPointerDown)
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '1':
      MODE = 'add'
      break
    case '2':
      MODE = 'remove'
      break
    default:
      break
  }
  checkIntersection(event, false)
})
window.addEventListener('resize', onWindowResize, false)

// end raycaster

animate()
