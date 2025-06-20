const API_URL = "http://localhost:8000/api"

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
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/usuarios/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não autorizado");
  }

  return await response.json();
};