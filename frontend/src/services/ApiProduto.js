const API_URL = "http://localhost:8000/api/estoque/"

export async function getProdutos() {
    const response = await fetch(`${API_URL}produtos/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Produtos")
    }
    const data = await response.json()
    return data
}