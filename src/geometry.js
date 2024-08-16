import * as THREE from 'three'

export default class Geometry {
  constructor({ scene, size = 4, height = 1 }) {
    this.scene = scene
    this.size = size
    this.height = height
  }

  setup() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshLambertMaterial({ color: 'gray', wireframe: false })
    this.cubes = []

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.height; y++) {
        for (let z = 0; z < this.size; z++) {
          const cube = new THREE.Mesh(this.geometry, this.material)
          cube.position.set(x + 0.5, y + 0.5, z + 0.5)
          this.scene.add(cube)
          this.cubes.push(cube)
        }
      }
    }
  }
}
