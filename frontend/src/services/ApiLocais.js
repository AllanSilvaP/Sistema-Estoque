const API_URL = "http://localhost:8000/api/estoque/"

export async function getLocais() {
    const response = await fetch(`${API_URL}localestocagens/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar localestocagens")
    }
    const data = await response.json()
    return data
}

export async function submitLocais(dados) {
    const response = await fetch(`${API_URL}localestocagens/`, {
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

export async function editLocais(dados) {
    const response = await fetch(`${API_URL}localestocagens/${dados.id}/`, {
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

export async function deleteLocais (id) {
    const response = await fetch(`${API_URL}localestocagens/${id}/`, {
        method: "DELETE",
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}