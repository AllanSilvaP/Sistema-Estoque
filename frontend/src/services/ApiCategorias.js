const API_URL = "http://localhost:8000/api/estoque/"

export async function getCategorias() {
    const response = await fetch(`${API_URL}categorias/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar Categoria")
    }
    const data = await response.json()
    return data
}