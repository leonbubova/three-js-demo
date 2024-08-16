import * as THREE from 'three'

export default class Helper {
  constructor({ scene }) {
    this.scene = scene
  }

  setup() {
    this.gridHelper = new THREE.GridHelper(10, 10)
    this.scene.add(this.gridHelper)

    this.axesHelper = new THREE.AxesHelper(5)
    this.scene.add(this.axesHelper)
  }
}
