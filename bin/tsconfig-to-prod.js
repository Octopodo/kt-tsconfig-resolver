#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function adjustTsconfig(
  configs = ['tsconfig.json', 'tsconfig.tests.json']
) {
  for (const config of configs) {
    const tsconfigPath = path.join(process.cwd(), config);
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8'));
    const tsconfigBackupPath = path.join(process.cwd(), `${config}.backup`);
    try {
      await fs.copyFile(tsconfigPath, tsconfigBackupPath);
    } catch (error) {
      console.log(`Error creating backup file: ${error}`);
      return;
    }
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
    await fs.writeFile(
      tsconfigPath,
      JSON.stringify(tsconfig, null, 2),
      'utf-8'
    );
    console.log(`${config} modified for production`);
  }
}

adjustTsconfig().catch(console.error);
