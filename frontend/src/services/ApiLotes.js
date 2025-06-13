const API_URL = "http://localhost:8000/api/estoque/"

export async function getLotes() {
    const response = await fetch(`${API_URL}lotes/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Lotes")
    }
    const data = await response.json()
    return data
}

export async function submitLotes(dados) {
    const response = await fetch(`${API_URL}lotes/`, {
        method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })

    if (!response.ok) {
        throw new Error ("Erro ao cadastrar Lote")
    }

    const data = await response.json()
    return data
}

export async function editLotes(dados) {
    const response = await fetch(`${API_URL}lotes/${dados.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })

    if(!response.ok) {
        throw new Error ("Erro ao editar Lote")
    }

    const data = await response.json()
    return data
}

export async function deleteLotes (id) {
    const response = await fetch(`${API_URL}lotes/${id}/`, {
        method: "DELETE",
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Lote")
    }

    return true
}