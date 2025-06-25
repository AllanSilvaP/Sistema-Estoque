// services/ApiEstoque.js

const API_URL = "http://localhost:8000/api/requisicoes/";
const token = localStorage.getItem("access_token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
};

export async function getProdutosEmEstoque() {
  try {
    const response = await fetch(`${API_URL}produtos-em-estoque/`, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar produtos em estoque:", err);
    throw err;
  }
}
