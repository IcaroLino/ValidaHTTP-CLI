import fs from 'fs';
import chalk from 'chalk';

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const links = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return links.length !== 0 ? links : 'Nenhum link encontrado no arquivo!';
}

function tratarErro(err) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(err.code, '- Problema ao ler o arquivo!'));
}

async function pegarLinksDoArquivo(caminho) {
  const encoding = 'utf-8';
  try {
    const texto = await fs.promises.readFile(caminho, encoding);
    return extrairLinks(texto);
  } catch (error) {
    return tratarErro(error);
  }
}

export default pegarLinksDoArquivo;
