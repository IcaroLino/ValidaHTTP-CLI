/* eslint-disable no-console */
/* eslint-disable import/extensions */
import fs from 'fs';
import chalk from 'chalk';
import pegarLinksDoArquivo from './src/tools.js';
import listaValidada from './src/validadorHttp.js';

const path = process.argv;

async function imprimirListaValidada(validador, listaLinks, id = '-') {
  console.log(
    chalk.yellow('Lista de Links'),
    chalk.black.bgBlue(id),
    validador ? await listaValidada(listaLinks) : listaLinks,
  );
}

async function processarArquivo(argumentos) {
  const caminho = argumentos[2];
  let validador = argumentos[3] === '--valida';

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    console.log(chalk.red('Arquivo ou diretório não existe!'));
    return;
  }

  if (fs.lstatSync(caminho).isFile()) {
    const links = await pegarLinksDoArquivo(caminho);
    if (links === 'Nenhum link encontrado no arquivo!') validador = false;
    imprimirListaValidada(validador, links);
  } else if (fs.lstatSync(caminho).isDirectory) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeArquivo) => {
      const links = await pegarLinksDoArquivo(`${caminho}/${nomeArquivo}`);
      if (links === 'Nenhum link encontrado no arquivo!') validador = false;
      imprimirListaValidada(validador, links, nomeArquivo);
    });
  }
}

processarArquivo(path);
