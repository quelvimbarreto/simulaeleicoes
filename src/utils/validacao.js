export function validarDados(dados) {
  const erros = [];
  if (!dados.vagas || dados.vagas < 1) {
    erros.push("O número de vagas deve ser maior que zero.");
  }
  if (!dados.partidos || dados.partidos.length === 0) {
    erros.push("Adicione ao menos um partido.");
  }
  dados.partidos.forEach((p, i) => {
    if (!p.nome || p.nome.trim() === "") {
      erros.push(`O partido #${i + 1} está sem nome.`);
    }
    if (p.votosLegenda < 0) {
      erros.push(`O partido ${p.nome} possui votos de legenda negativos.`);
    }
    if (!p.candidatos || p.candidatos.length === 0) {
      erros.push(`O partido ${p.nome} deve ter ao menos um candidato.`);
    }
    p.candidatos.forEach((c, j) => {
      if (!c.nome || c.nome.trim() === "") {
        erros.push(`Candidato #${j + 1} do partido ${p.nome} está sem nome.`);
      }
      if (c.votos < 0) {
        erros.push(
          `Candidato ${c.nome || `#${j + 1}`} do partido ${
            p.nome
          } possui votos negativos.`
        );
      }
    });
  });
  return erros;
}
