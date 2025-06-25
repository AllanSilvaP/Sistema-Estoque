const API_URL = "http://localhost:8000/api/estoque/"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export async function getLocais() {
    const response = await fetch(`${API_URL}localestocagens/`, {headers})

    if (!response.ok) {
        throw new Error("Erro ao buscar localestocagens")
    }
    const data = await response.json()
    return data
}

export async function submitLocais(dados) {
    const response = await fetch(`${API_URL}localestocagens/`, {
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

export async function editLocais(dados) {
    const response = await fetch(`${API_URL}localestocagens/${dados.id}/`, {
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

export async function deleteLocais (id) {
    const response = await fetch(`${API_URL}localestocagens/${id}/`, {
        method: "DELETE",
        headers
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}