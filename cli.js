/* eslint-disable import/extensions */
import fs from 'fs';
// import chalk from 'chalk';
import pegarLinksDoArquivo from './src/tools.js';
import listaValidada from './src/validadorHttp.js';

const path = process.argv;

async function processarArquivo(argumentos) {
  const caminho = argumentos[2];

  if (fs.lstatSync(caminho).isFile()) {
    const links = await pegarLinksDoArquivo(caminho);
    console.log(await listaValidada(links));
  }
}

processarArquivo(path);
