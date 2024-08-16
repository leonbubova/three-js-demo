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

animate()
