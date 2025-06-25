// services/ApiRelatorios.js

const API_URL = "http://localhost:8000/api/relatorios/";
const token = localStorage.getItem("access_token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function getGraficosRelatorios() {
  try {
    const response = await fetch(`${API_URL}graficos/`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data; // { grafico_barras: "...", grafico_linhas: "..." }
  } catch (err) {
    console.error("Erro ao buscar gráficos de relatórios:", err);
    throw err;
  }
}
