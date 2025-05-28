import { useState, useEffect } from "react";
import EntradaDados from "./components/entradaDados.jsx";
import Resultados from "./components/resultados.jsx";
import { processarEleicao } from "./utils/processamento.js";
import { validarDados } from "./utils/validacao.js";

const LOCAL_STORAGE_KEY = "dados-eleicao";
const dadosIniciais = {
  vagas: 11,
  partidos: [
    {
      nome: "Partido dos Trabalhadores",
      votosLegenda: 184,
      candidatos: [
        { nome: "DAIK DE GILMAZINHO", votos: 558 },
        { nome: "CHARLES DE JOSIAS", votos: 520 },
        { nome: "DAILTÃO DA LAGOINHA", votos: 407 },
        { nome: "DAI", votos: 335 },
        { nome: "LENO VALADARES", votos: 179 },
        { nome: "LUIS DE CONCILIA", votos: 154 },
        { nome: "RICARDO CAVALCANTE", votos: 97 },
        { nome: "MARIA HONORATO", votos: 77 },
        { nome: "EDISIA ALVES", votos: 75 },
        { nome: "IONE ANDRADE", votos: 73 },
      ],
    },
    {
      nome: "Rede Sustentabilidade",
      votosLegenda: 11,
      candidatos: [
        { nome: "JERRE DO BESOURO", votos: 394 },
        { nome: "TÉ DO PITIAL", votos: 193 },
        { nome: "LANY RODRIGUES", votos: 36 },
        { nome: "OLGA DA LAGOINHA", votos: 35 },
        { nome: "JOAO DE ABILIO", votos: 26 },
        { nome: "PROFESSOR EDINHO", votos: 23 },
        { nome: "KAILANE DA GAMELEIRA", votos: 15 },
        { nome: "VILELA DOS BABAS", votos: 14 },
        { nome: "MICAELA ROCHA", votos: 13 },
        { nome: "CHARLES DA AUTO ESCOLA", votos: 12 },
        { nome: "LEIDINHA DO PARAISO", votos: 11 },
        { nome: "CARLINHOS REIS", votos: 2 },
      ],
    },
    {
      nome: "Movimento Democrático Brasileiro",
      votosLegenda: 176,
      candidatos: [
        { nome: "NEGO RICO", votos: 820 },
        { nome: "LINDOELSON", votos: 811 },
        { nome: "GLEIVIA FREITAS", votos: 808 },
        { nome: "MAZINHO", votos: 681 },
        { nome: "TAU", votos: 614 },
        { nome: "NORBERTO OLIVEIRA", votos: 590 },
        { nome: "OSNY FIGUEIREDO", votos: 561 },
        { nome: "AURIANA ANDRADE", votos: 542 },
        { nome: "OLÁVIO ROCHA", votos: 450 },
        { nome: "ALBA DE RENAN", votos: 5 },
      ],
    },
    {
      nome: "Partido Socialista Brasileiro",
      votosLegenda: 52,
      candidatos: [
        { nome: "EDNEIDE BARBOSA", votos: 823 },
        { nome: "ALEX ROCHA", votos: 444 },
        { nome: "RAIMI PURCINO", votos: 144 },
        { nome: "FLAVINHO", votos: 51 },
        { nome: "FRANCINEUMA FLORA", votos: 25 },
        { nome: "GRACIANE SANTOS", votos: 16 },
        { nome: "KEKE DE BELINHA", votos: 8 },
      ],
    },
    {
      nome: "Partido Social Democrático",
      votosLegenda: 34,
      candidatos: [
        { nome: "RUTINHA DE NINHO", votos: 640 },
        { nome: "GILMACY", votos: 463 },
        { nome: "JUNIOR DE CAMALEÃO", votos: 58 },
        { nome: "DINA CARNEIRO", votos: 14 },
      ],
    },
    {
      nome: "AVANTE",
      votosLegenda: 21,
      candidatos: [
        { nome: "DELZA DE DONA", votos: 1159 },
        { nome: "SÁVIO MARQUES", votos: 519 },
        { nome: "PROFESSOR ZITO", votos: 35 },
      ],
    },
  ],
};

function getDadosFromLocalStorage() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return dadosIniciais;
      }
    }
  }
  return dadosIniciais;
}

function App() {
  const [dados, setDados] = useState(getDadosFromLocalStorage());
  const [resultados, setResultados] = useState(null);
  const [erros, setErros] = useState([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dados));
    handleCalcular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados]);

  const handleCalcular = () => {
    const validacao = validarDados(dados);
    if (validacao.length > 0) {
      setErros(validacao);
      setResultados(null);
      return;
    }
    setErros([]);
    setResultados(processarEleicao(dados));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
        Simulador de Vagas para Vereadores
      </h1>
      <EntradaDados dados={dados} setDados={setDados} />
      <div className="my-6 flex justify-center">
        <button
          onClick={handleCalcular}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Calcular Resultado
        </button>
      </div>
      {erros.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <b>Erros:</b>
          <ul className="list-disc pl-6">
            {erros.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      {resultados && <Resultados resultados={resultados} />}
      <footer className="mt-8 text-gray-400 text-xs text-center">
        Feito por Quelvim Uiliam Barreto dos Santos — Simulador de Eleições
      </footer>
    </div>
  );
}

export default App;
