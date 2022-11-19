/* eslint-disable import/extensions */
import fs from 'fs';
// import chalk from 'chalk';
import pegarLinksDoArquivo from './src/tools.js';

const path = process.argv;

async function processarArquivo(argumentos) {
  const caminho = argumentos[2];

  if (fs.lstatSync(caminho).isFile()) {
    console.log(await pegarLinksDoArquivo(caminho));
  }
}

processarArquivo(path);
