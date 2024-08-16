import * as THREE from 'three'

export default class Geometry {
  constructor({ scene }) {
    this.scene = scene
  }

  setup() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshLambertMaterial({ color: 'gray', wireframe: false })
    this.cubes = []

    this.cubes.push(new THREE.Mesh(this.geometry, this.material))
    this.cubes.push(new THREE.Mesh(this.geometry, this.material))
    this.cubes.push(new THREE.Mesh(this.geometry, this.material))
    this.scene.add(this.cubes[0], this.cubes[1], this.cubes[2])
    this.cubes[0].position.set(0, 0.5, 0)
    this.cubes[1].position.set(0, 0.5, 2)
    this.cubes[2].position.set(0, 0.5, -2)
  }
}
