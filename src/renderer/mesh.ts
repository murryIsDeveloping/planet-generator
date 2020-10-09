import { PlanetStyle } from './../generators/planet/style';
import { Noise } from "./../util/noise";
import { PlanetStatus } from "../generators/planet/config";

import {
  Face3,
  IcosahedronGeometry,
  Mesh,
  TorusGeometry,
  MeshStandardMaterial,
  TorusKnotBufferGeometry,
} from "three";

export enum MeshName {
  TERRAIN = "terrain",
  WATER = "water",
  RING = "ring",
  BLACKHOLE = "black hole",
}

export class MeshRenderer {
  private style: PlanetStyle;

  public mesh(status: PlanetStatus, style: PlanetStyle) {
    this.style = style;
    switch (status) {
      case "Not Found":
        return [];
      case "Supernova'd":
        return [this.blackHoleMesh()];
      default:
        return this.planetMesh();
    }
  }

  private planetMesh() {
    const mesh = [this.terrainMesh()];
    if (this.style.water) mesh.push(this.waterMesh());
    if (this.style.ring) mesh.push(this.ringMesh());
    return mesh;
  }

  private terrainMesh(): Mesh {
    let terrain = new IcosahedronGeometry(this.style.radius, this.style.detail);
    this.generateTerrain(terrain);
    this.paintTerrain(terrain);
    let material = new MeshStandardMaterial(this.style.materials.terrain);
    terrain.elementsNeedUpdate = true;
    let mesh = new Mesh(terrain, material);
    mesh.name = MeshName.TERRAIN;
    return mesh;
  }

  private waterMesh(): Mesh {
    let radius = this.style.radius + this.style.waterRadiusDif;
    let water = new IcosahedronGeometry(radius, this.style.waterDetail);
    let material = new MeshStandardMaterial(this.style.materials.water);
    let mesh = new Mesh(water, material);
    mesh.name = MeshName.WATER;
    return mesh;
  }

  private ringMesh(): Mesh {
    let radius = this.style.radius + this.style.ringRadiusDif + 0.5
    let ring = new TorusGeometry(radius, this.style.ringSize, 3, 15);
    let material = new MeshStandardMaterial(this.style.materials.ring);
    let mesh = new Mesh(ring, material);
    mesh.rotation.y += 0.2;
    mesh.rotation.x += 1.4;
    mesh.name = MeshName.RING;
    return mesh;
  }

  private blackHoleMesh() {
    let geometry = new TorusKnotBufferGeometry(1, 0.3, 100, 20, 9, 8);
    let material = new MeshStandardMaterial(this.style.materials.blackhole);
    let mesh = new Mesh(geometry, material);
    mesh.name = MeshName.BLACKHOLE;
    return mesh;
  }

  private faceLength(geometry: IcosahedronGeometry, face: Face3) {
    const lenOf = (name: string) => geometry.vertices[face[name]].length();
    return (lenOf("a") + lenOf("b") + lenOf("c")) / 3;
  }

  private generateTerrain(terrain: IcosahedronGeometry) {
    let noise = new Noise(this.style.name.toUpperCase(), this.style.noiseScale);
    terrain.vertices.forEach((vertex) => {
      let random = noise.set(vertex);
      vertex.setLength(this.newLength(random));
    });
  }

  private newLength(value: number) {
    return (value - 0.5) * 2 * this.style.height + this.style.radius;
  }

  private originalLength(value: number) {
    return (value - this.style.radius) / 2 / this.style.height + 0.5;
  }

  private paintTerrain(terrain: IcosahedronGeometry) {
    for (const face of terrain.faces) {
      const length = this.faceLength(terrain, face);
      const adjustedLength = this.originalLength(length);
      const colorRule = this.style.colors.find(
        (color) => color.offset >= adjustedLength
      );

      const color = colorRule.color;
      face.color = color;
    }
  }
}
