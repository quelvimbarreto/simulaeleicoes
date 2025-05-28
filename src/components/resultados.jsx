function Resultados({ resultados }) {
  return (
    <div className="bg-blue-50 rounded-lg shadow p-4 sm:p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-700">
        Resultados
      </h2>
      <div className="mb-2">
        <b>Total de votos válidos:</b> {resultados.totalVotosValidos}
      </div>
      <div className="mb-4">
        <b>Quociente Eleitoral (QE):</b> {resultados.quocienteEleitoral}
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Distribuição de vagas por partido
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-4 text-xs sm:text-base">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Partido</th>
              <th className="p-2 border">Votos válidos</th>
              <th className="p-2 border">Vagas iniciais</th>
              <th className="p-2 border">Vagas por sobras</th>
              <th className="p-2 border">Total de vagas</th>
            </tr>
          </thead>
          <tbody>
            {resultados.partidos.map((p, i) => (
              <tr key={i} className="text-center border-b">
                <td className="p-2 border">{p.nome}</td>
                <td className="p-2 border">{p.votosValidos}</td>
                <td className="p-2 border">{p.vagasIniciais}</td>
                <td className="p-2 border">{p.vagasSobra}</td>
                <td className="p-2 border font-bold">{p.totalVagas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Candidatos Eleitos
      </h3>
      {resultados.partidos.map((p, i) => (
        <div key={i} className="mb-2">
          <b>{p.nome}</b>
          <ul className="list-disc pl-6">
            {p.eleitos.map((c, j) => (
              <li key={j}>
                {c.nome} — {c.votos} votos
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Resultados;
