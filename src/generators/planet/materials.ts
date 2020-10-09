import { PlanetConfig } from './config';
import { MeshStandardMaterialParameters } from "three";

import { Color } from "three";
import { NumberSeed } from "../../util";

function rgbFactory(seed: NumberSeed): Color {
  return new Color(seed.next() * 0xffffff);
}

export type TerrainColors = { offset: number, color: Color }[]

export function terrainColors(seed: NumberSeed, avgColors = 2): TerrainColors {
  let offset = 0;

  const terrainColors = [];

  while (offset < 1) {
    offset += seed.next() / avgColors;

    let color = rgbFactory(seed);

    terrainColors.push({
      offset: offset > 1 ? 1 : offset,
      color,
    });
  }

  return terrainColors;
}

function waterMaterial(seed: NumberSeed): MeshStandardMaterialParameters {
  return {
    metalness: seed.next() * 0.4,
    opacity: (seed.next()/2) + 0.3,
    roughness: seed.next() * 1,
    flatShading: true,
    transparent: true,
    color: rgbFactory(seed),
  };
}

function ringMaterial(seed: NumberSeed): MeshStandardMaterialParameters {
  return {
    opacity: seed.next(),
    roughness: seed.next() * 2,
    flatShading: true,
    transparent: true,
    color: rgbFactory(seed),
  };
}

function blackHoleMaterial(seed: NumberSeed): MeshStandardMaterialParameters {
  return {
    metalness: seed.next(),
    opacity: 0.9,
    roughness: seed.next() * 2,
    flatShading: true,
    transparent: true,
    color: new Color(0x333333),
  };
}


function terrainMaterial(seed: NumberSeed, metalic: number): MeshStandardMaterialParameters {
  return {
    metalness: metalic * 0.5,
    roughness: seed.next() * 1,
    flatShading: true,
    color: rgbFactory(seed),
    vertexColors: true,
  };
}




export type PlanetMaterialConfig = {
    terrain: MeshStandardMaterialParameters,
    water: MeshStandardMaterialParameters,
    ring: MeshStandardMaterialParameters,
    blackhole: MeshStandardMaterialParameters,
}

export function planetMaterials(seed: NumberSeed, {metalic}: PlanetConfig): PlanetMaterialConfig {
    return {
        terrain: terrainMaterial(seed, metalic),
        water: waterMaterial(seed),
        ring: ringMaterial(seed),
        blackhole: blackHoleMaterial(seed),
    }
}