const API_URL = "http://localhost:8000/api/estoque/"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export async function getLotes() {
    const response = await fetch(`${API_URL}lotes/`, {headers})

    if (!response.ok) {
        throw new Error("Erro ao buscar Lotes")
    }
    const data = await response.json()
    return data
}

export async function submitLotes(dados) {
    const response = await fetch(`${API_URL}lotes/`, {
        method: "POST",
        headers,
        body: JSON.stringify(dados)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;  // Isso será capturado no `catch` do seu React
    }

    const data = await response.json()
    return data
}

export async function editLotes(dados) {
    const response = await fetch(`${API_URL}lotes/${dados.id}/`, {
        method: "PUT",
        headers,
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
        headers,
    })

    if(!response.ok) {
        throw new Error("Erro ao deletar Lote")
    }

    return true
}