import { useEffect, useState } from "react";
import InputCampo from "../layout/InputCampo";
import { getLocais } from "../../services/ApiLocais";

export default function FormUsuario({ onSubmit, form, setForm, onCancel }) {
    const [locais, setLocais] = useState([])

    // GET Locais
    useEffect(() => {
        getLocais()
            .then(setLocais)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    const gruposDisponiveis = [
        { id: 1, nome: "Admin" },
        { id: 2, nome: "Gerenciador Local" },
        { id: 3, nome: "Operador Local" },
        { id: 4, nome: "Auditor" },
    ]

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Nome"
            />
            <InputCampo
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={"Digite seu Email"}
            />
            <InputCampo
                type="password"
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                placeholder="Senha"
            />
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.local}
                onChange={(e) => setForm({ ...form, local: e.target.value })}
            >
                <option value="">Selecione o Local</option>
                {locais.map((cat, idx) => (
                    <option key={idx} value={String(cat.id)}>{cat.nome}</option>
                ))}
            </select>

            <select
                className="w-full border p-2 rounded text-gray-700"
                value={(form.groups && form.groups[0]) || ""}
                onChange={(e) =>
                    setForm({ ...form, groups: [e.target.value] })
                }
            >
                <option value="">Selecione o Cargo</option>
                {gruposDisponiveis.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                        {grupo.nome}
                    </option>
                ))}
            </select>



            <div className="flex justify-end mt-4 space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#12714D] text-white rounded hover:bg-[#169966]"
                >
                    Salvar
                </button>
            </div>
        </form>
    )
}
