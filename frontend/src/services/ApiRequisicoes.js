const API_URL = "http://localhost:8000/api/requisicoes/"

export async function getRequisicoes() {
    const response = await fetch(`${API_URL}requisicoes/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Requisicoes")
    }
    const data = await response.json()
    return data
}

export async function submitRequisicoes(dados) {
    const response = await fetch(`${API_URL}requisicoes/`, {
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

export async function editRequisicoes(dados) {
    const response = await fetch(`${API_URL}requisicoes/${dados.id}/`, {
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

export async function deleteRequisicoes (id) {
    const response = await fetch(`${API_URL}requisicoes/${id}/`, {
        method: "DELETE",
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Lote")
    }

    return true
}