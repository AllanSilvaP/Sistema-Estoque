const API_URL = "http://localhost:8000/api/estoque/"

export async function getProdutos() {
    const response = await fetch(`${API_URL}produtos/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Produtos")
    }
    const data = await response.json()
    return data
}

export async function submitProdutos(dados) {
    const response = await fetch(`${API_URL}produtos/`, {
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

export async function editProdutos(dados) {
    const response = await fetch(`${API_URL}produtos/${dados.id}/`, {
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

export async function deleteProdutos (id) {
    const response = await fetch(`${API_URL}produtos/${id}/`, {
        method: "DELETE",
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Categoria")
    }

    return true
}