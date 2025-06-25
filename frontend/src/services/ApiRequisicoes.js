const API_URL = "http://localhost:8000/api/requisicoes/"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export async function getRequisicoes() {
    const response = await fetch(`${API_URL}requisicoes/`, {headers})

    if (!response.ok) {
        throw new Error("Erro ao buscar Requisicoes")
    }
    const data = await response.json()
    return data
}

export async function submitRequisicoes(dados) {
    const response = await fetch(`${API_URL}requisicoes/`, {
        method: "POST",
        headers,
        body: JSON.stringify(dados)
    })

    if (!response.ok) {
        throw new Error ("Erro ao cadastrar Lote")
    }

    const data = await response.json()
    return data
}

export async function editRequisicoes(dados) {
    console.log("🔄 Enviando dados para editar requisição:", dados);

    const response = await fetch(`${API_URL}requisicoes/${dados.id}/`, {
        method: "PUT",
        headers,
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        throw new Error("Erro ao editar requisição");
    }

    const data = await response.json();
    console.log("✅ Resposta da API (editRequisicoes):", data);
    return data;
}


export async function deleteRequisicoes (id) {
    const response = await fetch(`${API_URL}requisicoes/${id}/`, {
        method: "DELETE",
        headers
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Lote")
    }

    return true
}

export async function processarRequisicao(id) {
    const resp = await fetch(`http://localhost:8000/api/requisicoes/${id}/processar/`, {
        method: 'POST',
        headers,
    });

    if (!resp.ok) throw new Error('Erro ao processar requisição');

    return await resp.json();
}
