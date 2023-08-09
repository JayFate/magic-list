#!/usr/bin/env node

"use strict";

const program = require("commander");
const { generate, parse } = require("../src/index");

console.clear();
console.log(`aaa`);

program
  .version(require("../package").version, "-v, --version")
  .usage("<command> [options]");

program
  .command("generate")
  .description("generate output")
  // .option("--disableCache", "disable cache")
  // .option(
  //   "--build-name-format <build-name-format>",
  //   "custom output rpk file name",
  //   validateBuildNameFormat
  // )
  // .option(
  //   "--target [target]",
  //   "构建应用的类型（卡片或APP）,值只能为app、card、 all， 默认all",
  //   "all"
  // )
  .action((options) => {
    console.log(typeof options);
    generate(options);
  });

program
  .command("parse <filepath>")
  .description("parse input file")
  .action((options) => {
    console.log(typeof options);
    parse(options);
  });

setTimeout(() => {
  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}, 0);
