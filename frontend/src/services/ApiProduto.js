const API_URL = "http://localhost:8000/api/estoque/"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export async function getProdutos() {
    const response = await fetch(`${API_URL}produtos/`, {headers})

    if (!response.ok) {
        throw new Error("Erro ao buscar Produtos")
    }
    const data = await response.json()
    return data
}

export async function submitProdutos(dados) {
    const response = await fetch(`${API_URL}produtos/`, {
        method: "POST",
        headers,
        body: JSON.stringify(dados)
    })

    if (!response.ok) {
        throw new Error ("Erro ao cadastrar Categoria")
    }

    const data = await response.json()
    return data
}

export async function editProdutos(dados) {
    const response = await fetch(`${API_URL}produtos/${dados.id}/`, {
        method: "PUT",
        headers,
        body: JSON.stringify(dados)
    })

    if(!response.ok) {
        throw new Error ("Erro ao editar Categoria")
    }

    const data = await response.json()
    return data
}

export async function deleteProdutos (id) {
    const response = await fetch(`${API_URL}produtos/${id}/`, {
        method: "DELETE",
        headers,
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}