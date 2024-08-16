import * as THREE from 'three'

export default class OrbitCamera {
  constructor({ scene }) {
    this.scene = scene
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.cameraDistance = 6
    this.camera.position.set(this.cameraDistance, 4, this.cameraDistance)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }
}
