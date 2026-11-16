#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

function usage() {
  console.log(`
Instalador da skill First Customer Finder BR (Claude Code)

Usage:
  npx --yes github:ArlanSousa90/first-customer-finder-br#v0.1.0-br.1
  node scripts/install.js --skills-dir ~/.claude/skills

Options:
  --skills-dir PATH  Instala numa pasta de skills específica
  --help             Mostra esta ajuda
`);
}

function expandHome(value) {
  if (!value) return value;
  if (value === "~") return os.homedir();
  if (value.startsWith("~/")) return path.join(os.homedir(), value.slice(2));
  return value;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--skills-dir") {
      const value = argv[index + 1];
      if (!value) throw new Error("--skills-dir requires a value");
      options.skillsDir = expandHome(value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function defaultSkillsDir() {
  const configDir =
    process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
  return path.join(configDir, "skills");
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
    else if (entry.isFile()) fs.copyFileSync(sourcePath, destinationPath);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const source = path.resolve(__dirname, "..", "skills", "first-customer-finder-br");
  const skillsDir = path.resolve(options.skillsDir || defaultSkillsDir());
  const destination = path.join(skillsDir, "first-customer-finder-br");
  if (!fs.existsSync(source)) throw new Error(`Cannot find bundled skill at ${source}`);

  fs.mkdirSync(skillsDir, { recursive: true });
  if (path.basename(destination) !== "first-customer-finder-br") throw new Error(`Destino inesperado: ${destination}`);
  fs.rmSync(destination, { recursive: true, force: true });
  copyDirectory(source, destination);

  console.log("Skill first-customer-finder-br instalada no Claude Code.");
  console.log(`Local: ${destination}`);
  console.log("");
  console.log("Abra uma nova sessão do Claude Code e peça, por exemplo:");
  console.log('  "Ache dez possíveis primeiros clientes para https://exemplo.com.br"');
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
