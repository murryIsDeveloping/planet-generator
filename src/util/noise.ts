import SimplexNoise from 'simplex-noise';
import { Vector3 } from "three";

export class Noise {
  noise: SimplexNoise;
  noiseScale: number;
  constructor(seed: string, noiseScale: number) {
    this.noise = new SimplexNoise(seed);
    this.noiseScale = noiseScale;
  }

  set(vector: Vector3) {
    return (
      this.noise.noise3D(
        vector.x * this.noiseScale,
        vector.y * this.noiseScale,
        vector.z * this.noiseScale
      ) /
        2 +
      0.5
    );
  }
}
