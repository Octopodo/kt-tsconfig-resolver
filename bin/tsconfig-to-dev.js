#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function restoreTsconfig() {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const backupPath = path.join(process.cwd(), 'tsconfig.json.backup');

  try {
    await fs.copyFile(backupPath, tsconfigPath);
    console.log('tsconfig.json restored');
    fs.rm(backupPath);
  } catch (error) {
    console.log(`Error deleting backup file: ${error}`);
  }
}

restoreTsconfig().catch(console.error);
