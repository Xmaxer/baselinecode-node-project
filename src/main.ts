#!/usr/bin/env node
import { Command } from 'commander';
import spawn from 'cross-spawn';
import * as fs from 'node:fs';
import path from 'path';

const program = new Command();

program
  .name('@baselinecode/node-project')
  .description('CLI to generate a basic node project');

program.requiredOption('-n, --name <string>');

program.parse();

const options = program.opts();
const projectName = options.name;

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

const packageJson = require(path.join(projectDir, 'package.json'));

const newPackageJson = { ...packageJson, name: projectName };

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(newPackageJson, null, 2),
);

spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: projectDir });
spawn.sync('git', ['init'], { stdio: 'inherit', cwd: projectDir });

console.log(`Project created in ${projectDir}`);
