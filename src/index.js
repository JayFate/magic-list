const path = require("path");
const fs = require("fs-extra");
const glob = require("glob");
const { parse: _parse, tag, nameTag } = require("./parse");

const cwd = process.cwd();

const defaultOptions = {
  name: "output.md",
  path: cwd,
  getPrefix: (ext) => "```" + ext,
  subfix: "```",
  content: "",
};

function encode(str) {
  return str.replace(/```/gm, "\\`\\`\\`");
}

function decode(str) {
  return str.replaceAll("\\`\\`\\`", "```");
}

function generate(options) {
  const fileList = glob
    .sync("**/**", {
      ignore: [
        "node_modules/**",
        "**/package-lock.json",
        "**/yarn.lock",
        "pnpm-lock.yaml",
      ],
      withFileTypes: true,
    })
    .filter((f) => f.isFile())
    .map((f) => {
      return {
        name: f.relative(),
        ext: path.extname(f.name),
        content: fs.readFileSync(f.fullpath(), "utf-8"),
      };
    });

  const output = {
    name: "output.md",
    path: cwd,
    getPrefix: (ext) => "```" + ext,
    subfix: "```",
    content: "",
  };

  function assemble(fileInfo) {
    console.log(`fileInfo.name1`, fileInfo.name);
    if (fileInfo.name.match("parse")) {
      debugger;
    }
    if (fileInfo.content.match(tag) && fileInfo.name !== "src/parse.js") return;
    console.log(`fileInfo.name2`, fileInfo.name);
    const pieces = [
      "\n" + nameTag + "\n`" + fileInfo.name + "`\n" + nameTag + "\n",
      output.getPrefix(fileInfo.ext.slice(1) || fileInfo.name),
      encode(fileInfo.content),
    ].join("\n\n");
    output.content += pieces + output.subfix + "\n\n" + tag + "\n\n";
  }
  debugger;
  fileList.forEach((f) => assemble(f));

  fs.writeFileSync(
    path.resolve(output.path, output.name),
    output.content,
    "utf-8"
  );
}

function parse(p = "output.md") {
  if (!path.isAbsolute(p)) {
    p = path.resolve(cwd, p);
  }
  _parse(p);
}

module.exports = {
  generate,
  parse,
  tag,
  nameTag,
};
