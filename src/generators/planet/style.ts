import { PlanetConfig, PlanetStatus } from "./config";
import {
  planetMaterials,
  terrainColors,
  TerrainColors,
  PlanetMaterialConfig,
} from "./materials";
import { NumberSeed } from "./../../util/random";
import { evolve, identity, add, lt } from "ramda";

export const multiplyConfig = (
  seed: NumberSeed,
  planetConfig: PlanetConfig
) => {
  const xSeed = (transformation) => (value) =>
    transformation(seed.next() * value);

  const transformations = {
    metalic: xSeed(identity),
    noiseScale: xSeed(identity),
    detail: xSeed(Math.floor),
    waterDetail: xSeed(Math.floor),
    height: xSeed(identity),
    radius: xSeed(add(1)),
    waterRadiusDif: xSeed(identity),
    ring: xSeed(lt(0.5)),
    water: xSeed(lt(0.5)),
    waterOpacity: xSeed(identity),
    ringOpacity: xSeed(identity),
    ringRadiusDif: xSeed(identity),
    ringSize: xSeed(identity),
  };

  return evolve(transformations, planetConfig);
};

export type PlanetStyle = {
  background: number;
  colors: TerrainColors;
  detail: number;
  height: number;
  materials: PlanetMaterialConfig;
  name: string;
  noiseScale: number;
  price: number;
  radius: number;
  ring: boolean;
  ringOpacity: number;
  ringSize: number;
  ringRadiusDif: number;
  soldPercent: number;
  status: PlanetStatus;
  supernovaPercent: number;
  validName: boolean;
  water: boolean;
  waterDetail: number;
  waterOpacity: number;
  waterRadiusDif: number;
};

export const planetStyle = (planetConfig: PlanetConfig) : PlanetStyle => {
  const seed = new NumberSeed(planetConfig.name.toUpperCase());
  return {
    ...multiplyConfig(seed, planetConfig),
    materials: planetMaterials(seed, planetConfig),
    colors: terrainColors(seed),
  };
};
