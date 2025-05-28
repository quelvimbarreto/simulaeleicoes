export function processarEleicao(dados) {
  // 1. Total de votos válidos
  const totalVotosValidos = dados.partidos.reduce(
    (acc, p) =>
      acc + p.votosLegenda + p.candidatos.reduce((a, c) => a + c.votos, 0),
    0
  );

  // 2. Quociente Eleitoral (QE)
  let qe = totalVotosValidos / dados.vagas;
  const fracao = qe - Math.floor(qe);
  let quocienteEleitoral;
  if (fracao <= 0.5) {
    quocienteEleitoral = Math.floor(qe);
  } else {
    quocienteEleitoral = Math.ceil(qe);
  }

  // 3. Para cada partido: votos válidos, QP, vagas iniciais
  let partidos = dados.partidos.map((p) => {
    const votosValidos =
      p.votosLegenda + p.candidatos.reduce((a, c) => a + c.votos, 0);
    const qp = quocienteEleitoral > 0 ? votosValidos / quocienteEleitoral : 0;
    const vagasIniciais = Math.floor(qp);
    return {
      ...p,
      votosValidos,
      qp,
      vagasIniciais,
      vagasSobra: 0,
      totalVagas: vagasIniciais,
      eleitos: [],
    };
  });

  // 4. Distribuição das sobras (maiores médias)
  let vagasDistribuidas = partidos.reduce((acc, p) => acc + p.vagasIniciais, 0);
  let vagasRestantes = dados.vagas - vagasDistribuidas;

  for (let i = 0; i < vagasRestantes; i++) {
    // Calcula médias
    let medias = partidos.map((p) => {
      return p.totalVagas < p.candidatos.length
        ? p.votosValidos / (p.totalVagas + 1)
        : -1; // Não pode receber mais vagas do que candidatos
    });
    // Acha o maior
    let maiorMedia = Math.max(...medias);
    let idx = medias.indexOf(maiorMedia);
    if (idx !== -1) {
      partidos[idx].vagasSobra += 1;
      partidos[idx].totalVagas += 1;
    }
  }

  // 5. Para cada partido, ordena candidatos por votos e atribui vagas
  partidos = partidos.map((p) => {
    const candidatosOrdenados = [...p.candidatos].sort(
      (a, b) => b.votos - a.votos
    );
    return {
      ...p,
      eleitos: candidatosOrdenados.slice(0, p.totalVagas),
    };
  });

  return {
    totalVotosValidos,
    quocienteEleitoral,
    partidos,
  };
}
