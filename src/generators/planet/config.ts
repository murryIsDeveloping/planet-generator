import { add, multiply, pipe, evolve, identity } from "ramda";

export type PlanetStatus =
  | "For Sale"
  | "Sold"
  | "Supernova'd"
  | "Not Found"
  | null;

export type PlanetConfig = {
  metalic: number;
  status: PlanetStatus;
  validName: boolean;
  prefix: string;
  postfix: string;
  name: string; // name of planet
  background: number; // background to scene
  noiseScale: number; // max amount of noise
  detail: number; // max detail
  waterDetail: number; // max detail
  height: number; // max terrain height
  radius: number; // max radius - 1
  waterRadiusDif: number; // difference from radius
  ring: number; // percent chance of ring
  water: number; // percent chance of water
  waterOpacity: number; // water opacity multiplier
  ringOpacity: number; // ring opacity multiplier
  ringRadiusDif: number;
  ringSize: number;
  soldPercent: number; // percent chance of being sold
  supernovaPercent: number; // percent chance of supernova
  price: number; // price multiplier
};

const basePlanetConfig = (name: string): PlanetConfig => ({
  metalic: 1,
  status: null,
  validName: true,
  prefix: "",
  postfix: "",
  name: name,
  background: 0,
  noiseScale: 2,
  detail: 30,
  waterDetail: 30,
  height: 0.5,
  radius: 2,
  waterRadiusDif: 0,
  ring: 0.7,
  water: 1,
  waterOpacity: 1,
  ringOpacity: 1,
  ringRadiusDif: 1,
  ringSize: 1,
  soldPercent: 0.25,
  supernovaPercent: 0.025,
  price: 1,
});

const prefixName = (prefixValue: string) => (planet: PlanetConfig) => {
    return {
      ...planet,
      prefix: prefixValue + planet.prefix
    };
};

const postfixName = (postfixValue: string) => (planet: PlanetConfig) => {
  return {
    ...planet,
    postfix: planet.postfix + postfixValue,
  };
};

const multiper = (prop: string, multipier: number) =>
  evolve({
    [prop]: multiply(multipier),
  });

const DIMENSION_TRANSFORMATIONS = {
  "0": postfixName("!"),
  "1": multiper("ring", 1.2),
  "2": multiper("water", 0.7),
  "3": multiper("radius", 0.7),
  "4": multiper("price", 0.7),
  "5": multiper("price", 1.4),
  "6": multiper("metalic", 1.2),
  "7": evolve({
    detail: multiply(1.3),
    waterDetail: multiply(1.3),
    price: multiply(1.1),
  }),
  "8": multiper("soldPercent", 3),
  "9": multiper("supernovaPercent", 5),
  A: postfixName(" Land"),
  B: evolve({
    detail: multiply(0.8),
    waterDetail: multiply(0.8),
    price: multiply(0.8),
  }),
  // update background to cats
  C: evolve({
    background: add(1),
  }),
  D: prefixName("Sm"),
  // everythings in a box
  E: pipe(prefixName("[ "), postfixName(" ]"), evolve({ detail: multiply(0.5) })),
  // fart dimension lower price greater gas radius and chance of gas
  F: evolve({
    price: multiply(0.9),
    water: multiply(1.1),
    waterRadiusDif: add(0.2),
  }),
};

const validNaming = (config: PlanetConfig) => {
  const { name, prefix, postfix, validName } = config;
  const correctNaming = name.startsWith(prefix) && name.endsWith(postfix);
  return {
    ...config,
    status: correctNaming && validName ? config.status : "Not Found"
  }

}

export function planetConfig(name: string, dimension: string): PlanetConfig {
  console.log({dimension})
  const transformations = dimension
    .split("")
    .map((x) => DIMENSION_TRANSFORMATIONS[x.toUpperCase()] || identity);

  const config = transformations.reduce(
    (config, transform) => transform(config),
    basePlanetConfig(name)
  );

  // reset name for easy use
  return validNaming(config)
}

