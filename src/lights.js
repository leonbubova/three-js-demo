import * as THREE from 'three'

export default class Lights {
  constructor({ scene }) {
    this.scene = scene
  }

  setup() {
    this.pointLight = new THREE.PointLight('white', 50, 100, 2)
    this.pointLight.position.set(-5, 5, 5)
    this.scene.add(this.pointLight)

    this.hemisphereLight = new THREE.HemisphereLight('white', 'white', 0.5)
    this.scene.add(this.hemisphereLight)
  }
}
