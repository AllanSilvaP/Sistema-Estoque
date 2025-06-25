const API_URL = "http://localhost:8000/api"
const token = localStorage.getItem("access_token")

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export const login = async (email, senha) => {
    const response = await fetch(`${API_URL}/usuarios/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password: senha}),
    })

    if (!response.ok) {
        throw new Error('Credenciais Invalidas!')
    }
    const data = await response.json()
    return data
}

export const cadastrarUsuario = async (dados) => {
    const response = await fetch(`${API_URL}/usuarios/cadastro/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados),
    })

    if (!response.ok) {
        throw new Error("Credenciais Invalidas")
    }

    const data = await response.json()
    return data
}

//pega rota
export const getPerfil = async () => {
  const response = await fetch(`${API_URL}/usuarios/me/`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Não autorizado");
  }

  return await response.json();
};

//CRUD

export const getUsuarios = async () => {
  const response = await fetch(`${API_URL}/usuarios/usuarios/`, {headers})
  if (!response.ok) throw new Error("Erro ao buscar usuários")
  return await response.json()
}

export const editUsuarios = async (id, dados) => {
  const response = await fetch(`${API_URL}/usuarios/usuarios/${id}/`, {
    method: "PUT", 
    headers,
    body: JSON.stringify(dados)
  })
  if (!response.ok) throw new Error("Erro ao editar usuário")
  return await response.json()
}

export const deleteUsuarios = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/usuarios/${id}/`, {
    method: "DELETE",
    headers
  })
  if (!response.ok) throw new Error("Erro ao deletar usuário")
  return true;
}