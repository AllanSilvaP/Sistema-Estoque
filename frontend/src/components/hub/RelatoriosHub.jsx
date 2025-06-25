import React, { useEffect, useState } from "react";
import { getGraficosRelatorios } from "../../services/ApiRelatorios";

export default function EstoqueHub() {
  const [graficos, setGraficos] = useState({});

  useEffect(() => {
    getGraficosRelatorios()
      .then(setGraficos)
      .catch(() =>
        alert("Erro ao carregar gráficos. Verifique o console.")
      );
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-[#12714D] mb-8">Relatórios</h1>

      <section className="w-full max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-[#12714D] mb-4 border-b border-[#12714D] pb-2">
          Produtos por Categoria
        </h2>
        {graficos.grafico_barras ? (
          <img
            src={`data:image/png;base64,${graficos.grafico_barras}`}
            alt="Gráfico de Barras"
            className="w-full max-w-full object-contain"
          />
        ) : (
          <p className="text-gray-500">Carregando gráfico...</p>
        )}
      </section>

      <section className="w-full max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-[#12714D] mb-4 border-b border-[#12714D] pb-2">
          Quantidade por Data de Validade
        </h2>
        {graficos.grafico_linhas ? (
          <img
            src={`data:image/png;base64,${graficos.grafico_linhas}`}
            alt="Gráfico de Linhas"
            className="w-full max-w-full object-contain"
          />
        ) : (
          <p className="text-gray-500">Carregando gráfico...</p>
        )}
      </section>

      <section className="w-full max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-[#12714D] mb-4 border-b border-[#12714D] pb-2">
          Quantidade de Produtos por Local
        </h2>
        {graficos.grafico_locais ? (
          <img
            src={`data:image/png;base64,${graficos.grafico_locais}`}
            alt="Gráfico de Locais"
            className="w-full max-w-full object-contain"
          />
        ) : (
          <p className="text-gray-500">Carregando gráfico...</p>
        )}
      </section>
    </div>
  );
}
