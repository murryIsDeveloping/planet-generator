import { pipe, identity } from "ramda";

const FOC = [
  "Murry",
  "Jemaine",
  "Bret",
  "Dave",
  "Eugene",
  "Jim",
  "Mel",
  "Greg",
];
const SW = [
  "Darth Vader",
  "Leia",
  "Rey",
  "Luke Skywalker",
  "Obi-Wan Kenobi",
  "Yoda",
  "Chewbacca",
  "Han Solo",
  "RD-D2",
  "C3P0",
  "Jar Jar Binks",
];
const RM = ["Rick", "Morty", "Summer", "Beth", "Jerry", "Sqanchy", "Jessica"];

export const namingCombinations = {
    prefix: ["", "Planet ", "Quadrant "],
    postfix: ["", " World", " Land"],
    name: [...FOC, ...SW, ...RM]
}

type NameConfig = { prefix: string; postfix: string; exclude: Set<string> };

const baseNameConfig = {
  prefix: "",
  postfix: "",
  exclude: new Set(),
};

const prefixName = (prefixValue: string) => (config: NameConfig) => ({
  ...config,
  prefix: prefixValue + config.prefix,
});

const postfixName = (postfixValue: string) => (config: NameConfig) => ({
  ...config,
  postfix: config.postfix + postfixValue,
});

const exclude = (value: string) => (config: NameConfig) => ({
  ...config,
  exclude: new Set([...Array.from(config.exclude), value]),
});

const DIMENSION_NAMING = {
  "0": postfixName("!"),
  "7": exclude("Earth"),
  A: postfixName(" Land"),
  D: prefixName("Sm"),
  // everythings in a box
  E: pipe(prefixName("[ "), postfixName(" ]")),
};

export const dimensionConfig = (name: string) : NameConfig => {
  const namingConvenions = name.split("").map((x) => DIMENSION_NAMING[x.toUpperCase()] || identity);

  return namingConvenions.reduce(
    (config, transform) => transform(config),
    baseNameConfig
  );
};
