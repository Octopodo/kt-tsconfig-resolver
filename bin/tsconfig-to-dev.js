#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function restoreTsconfig(
  configs = ['tsconfig.json', 'tsconfig.tests.json']
) {
  for (const config of configs) {
    const tsconfigPath = path.join(process.cwd(), config);
    const backupPath = path.join(process.cwd(), `${config}.backup`);

    try {
      await fs.copyFile(backupPath, tsconfigPath);
      console.log(`${config} restored`);
      fs.rm(backupPath);
    } catch (error) {
      console.log(`Error deleting backup file: ${error}`);
    }
  }
}

restoreTsconfig().catch(console.error);
