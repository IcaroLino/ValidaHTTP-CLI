function tratarErro(err) {
  if (err.cause.code === 'ENOTFOUND') return 'Link não encontrado';
  return 'Ocorreu algum erro no Fetch()';
}

function extrairListaURLs(arrayLinks) {
  return arrayLinks.map((objLink) => Object.values(objLink).join());
}

async function checarStatus(listaURLs) {
  const listaStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const res = await fetch(url);
        return res.status;
      } catch (error) {
        return tratarErro(error);
      }
    }),
  );

  return listaStatus;
}

async function listaValidada(arrayLinks) {
  const listaStatus = await checarStatus(extrairListaURLs(arrayLinks));
  return arrayLinks.map((objLink, index) => ({ ...objLink, status: listaStatus[index] }));
}

export default listaValidada;
