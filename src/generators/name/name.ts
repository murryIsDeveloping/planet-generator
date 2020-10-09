import { isEmpty } from "ramda";
import { dimensionConfig, namingCombinations } from "./config";


function getName(exclude: Set<string>) {
    const name = random("name");
    return exclude.has(name) ? getName(exclude) : name;
}

function random(type: "prefix" | "postfix" | "name"){
    const list = namingCombinations[type];
    const index = Math.floor(Math.random()*list.length);
    return list[index];
}

export function nameGenerator(dimension: string){
    const config = dimensionConfig(dimension)
    const prefix = isEmpty(config.prefix) ? random("prefix") : config.prefix
    const postfix = isEmpty(config.postfix) ? random("postfix") : config.postfix
    const name = getName(config.exclude)
    return prefix + name + postfix;
}