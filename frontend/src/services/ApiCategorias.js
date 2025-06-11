const API_URL = "http://localhost:8000/api/estoque/"

export async function getCategorias() {
    const response = await fetch(`${API_URL}categorias/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Categoria")
    }
    const data = await response.json()
    return data
}

export async function submitCategorias(dados) {
    const response = await fetch(`${API_URL}categorias/${dados.id}`, {
        method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })

    if (!response.ok) {
        throw new Error ("Erro ao cadastrar Categoria")
    }

    const data = await response.json()
    return data
}

export async function editCategorias(dados) {
    const response = await fetch(`${API_URL}categorias/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })

    if(!response.ok) {
        throw new Error ("Erro ao editar Categoria")
    }

    const data = await response.json()
    return data
}

export async function deleteCategorias (id) {
    const response = await fetch(`${API_URL}categorias/${id}`, {
        method: "DELETE",
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}