#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function adjustTsconfig() {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8'));
  const tsconfigBackupPath = path.join(process.cwd(), 'tsconfig.json.backup');

  await fs.copyFile(tsconfigPath, tsconfigBackupPath);
  // Modifica las rutas en "types"
  tsconfig.compilerOptions.types = tsconfig.compilerOptions.types.map(
    (type) => {
      if (type.startsWith('./node_modules/types-for-adobe')) {
        return type.replace(
          './node_modules/types-for-adobe',
          '../types-for-adobe'
        );
      }
      return type;
    }
  );

  // Escribe el tsconfig modificado

  await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
  console.log('tsconfig.json modified for production');
}

adjustTsconfig().catch(console.error);
