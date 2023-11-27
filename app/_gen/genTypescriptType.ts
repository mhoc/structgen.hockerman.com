import * as prettier from "prettier";
import * as tsParser from "prettier/parser-typescript";
import * as prettierPluginEstree from "prettier/plugins/estree";

export const genTypescriptType = async (obj: any): Promise<string> => {
  const result = `type MyType = ${_genTypescriptType(obj)}`;
  return prettier.format(result, {
    parser: "typescript",
    plugins: [tsParser, prettierPluginEstree],
  });
};

const _genTypescriptType = (obj: any): string => {
  if (typeof obj === "undefined" || obj === null) {
    return `undefined`;
  }
  if (typeof obj === "string") {
    return `string`;
  }
  if (typeof obj === "number") {
    return `number`;
  }
  if (typeof obj === "boolean") {
    return `boolean`;
  }
  if (Array.isArray(obj)) {
    const allPotentialTypes = Array.from(new Set(obj.map(_genTypescriptType)));
    return `Array<${allPotentialTypes.join(" | ")}>`;
  }
  if (typeof obj === "object") {
    let result = "{";
    for (const key of Object.keys(obj)) {
      result = `${result} ${key}: ${_genTypescriptType(obj[key])}; `;
    }
    return `${result} }`;
  }
  throw new Error("idk man, this is hard");
};
