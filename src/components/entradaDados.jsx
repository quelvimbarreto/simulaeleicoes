function EntradaDados({ dados, setDados }) {
  // Atualiza o número de vagas
  const handleVagas = (e) => {
    setDados({ ...dados, vagas: Number(e.target.value) });
  };

  // Atualiza informações do partido (nome ou votosLegenda)
  const handlePartidoChange = (i, campo, valor) => {
    const partidos = [...dados.partidos];
    partidos[i][campo] = campo === "votosLegenda" ? Number(valor) : valor;
    setDados({ ...dados, partidos });
  };

  // Atualiza informações do candidato (nome ou votos)
  const handleCandidatoChange = (i, j, campo, valor) => {
    const partidos = [...dados.partidos];
    partidos[i].candidatos[j][campo] =
      campo === "votos" ? Number(valor) : valor;
    setDados({ ...dados, partidos });
  };

  // Adiciona um novo partido
  const adicionarPartido = () => {
    setDados({
      ...dados,
      partidos: [
        ...dados.partidos,
        { nome: "", votosLegenda: 0, candidatos: [{ nome: "", votos: 0 }] },
      ],
    });
  };

  // Remove um partido
  const removerPartido = (i) => {
    if (!window.confirm("Tem certeza que deseja remover este partido?")) {
      return;
    }
    const partidos = dados.partidos.filter((_, idx) => idx !== i);
    setDados({ ...dados, partidos });
  };

  // Adiciona um novo candidato ao partido
  const adicionarCandidato = (i) => {
    const partidos = [...dados.partidos];
    partidos[i].candidatos.push({ nome: "", votos: 0 });
    setDados({ ...dados, partidos });
  };

  // Remove um candidato do partido
  const removerCandidato = (i, j) => {
    if (!window.confirm("Tem certeza que deseja remover este candidato?")) {
      return;
    }
    const partidos = [...dados.partidos];
    partidos[i].candidatos = partidos[i].candidatos.filter(
      (_, idx) => idx !== j
    );
    setDados({ ...dados, partidos });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-700">
        Entrada de Dados
      </h2>
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Número de vagas (cadeiras):
          <input
            type="number"
            min={1}
            value={dados.vagas}
            onChange={handleVagas}
            className="ml-2 w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">Partidos</h3>
      {dados.partidos.map((partido, i) => (
        <div key={i} className="border rounded p-3 sm:p-4 mb-4 bg-gray-50">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-4 mb-2">
            <label className="flex-1 w-full">
              <span className="block text-sm font-medium">
                Nome do partido:
              </span>
              <input
                value={partido.nome}
                onChange={(e) => handlePartidoChange(i, "nome", e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <label className="flex-1 w-full">
              <span className="block text-sm font-medium">
                Votos de legenda:
              </span>
              <input
                type="number"
                min={0}
                value={partido.votosLegenda}
                onChange={(e) =>
                  handlePartidoChange(i, "votosLegenda", e.target.value)
                }
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
            <button
              onClick={() => removerPartido(i)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
            >
              Remover partido
            </button>
          </div>
          <div>
            <b className="block mb-1">Candidatos:</b>
            {partido.candidatos.map((cand, j) => (
              <div
                key={j}
                className="flex flex-col sm:flex-row items-center gap-2 mb-2"
              >
                <input
                  value={cand.nome}
                  onChange={(e) =>
                    handleCandidatoChange(i, j, "nome", e.target.value)
                  }
                  placeholder="Nome"
                  className="w-full sm:w-40 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  min={0}
                  value={cand.votos}
                  onChange={(e) =>
                    handleCandidatoChange(i, j, "votos", e.target.value)
                  }
                  placeholder="Votos"
                  className="w-full sm:w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => removerCandidato(i, j)}
                  className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 w-full sm:w-auto"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              onClick={() => adicionarCandidato(i)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
            >
              Adicionar candidato
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={adicionarPartido}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
      >
        Adicionar partido
      </button>
    </div>
  );
}

export default EntradaDados;
