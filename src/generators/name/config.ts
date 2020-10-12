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
  "Jaba the Hut",
  "Boba Fett",
  "General Grievous",
  "BB-8",
  "Darth Maul",
  "Mace Windu",
  "Jango Fett",
  "Admiral Ackbar"
];
const RM = ["Rick", "Morty", "Summer", "Beth", "Jerry", "Sqanchy", "Jessica", "Bird Person", "Mr Poopybutthole"];

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

const DIMENSION_NAMING = {
  "0": postfixName("!"),
  A: postfixName(" Land"),
  D: prefixName("Sm-"),
  E: pipe(prefixName("[ "), postfixName(" ]")),
};

export const dimensionConfig = (name: string) : NameConfig => {
  const namingConvenions = name.split("").map((x) => DIMENSION_NAMING[x.toUpperCase()] || identity);

  return namingConvenions.reduce(
    (config, transform) => transform(config),
    baseNameConfig
  );
};
