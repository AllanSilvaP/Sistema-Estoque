const API_URL = "http://localhost:8000/api/estoque/"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}
export async function getCategorias() {
    const response = await fetch(`${API_URL}categorias/`, {headers})

    if (!response.ok) {
        throw new Error("Erro ao buscar Categoria")
    }
    const data = await response.json()
    return data
}

export async function submitCategorias(dados) {
    const response = await fetch(`${API_URL}categorias/`, {
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

export async function editCategorias(dados) {
    const response = await fetch(`${API_URL}categorias/${dados.id}/`, {
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

export async function deleteCategorias (id) {
    const response = await fetch(`${API_URL}categorias/${id}/`, {
        method: "DELETE",
        headers
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}