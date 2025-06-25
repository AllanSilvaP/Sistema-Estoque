import { useEffect, useState } from "react";
import { getPerfil } from "../../services/ApiUsuario";

export default function PerfilHub() {
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        local: { nome: "" },
        groups: [],
        data_criacao: ""
    })

    // GET PERFIL
    useEffect(() => {
        getPerfil()
            .then(setUsuario)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar perfil")
            })
    }, [])

    const gruposDisponiveis = [
        { id: 1, nome: "Admin" },
        { id: 2, nome: "Gerenciador Local" },
        { id: 3, nome: "Operador Local" },
        { id: 4, nome: "Auditor" },
    ]

    function obterNomeGrupoPorId(id) {
        const grupo = gruposDisponiveis.find(g => g.id === id || g.nome === id);
        return grupo ? grupo.nome : "Desconhecido";
    }

    const arrumarData = (data) => {
        const d = new Date(data);
        return isNaN(d.getTime()) ? "Data inválida" : d.toLocaleDateString('pt-BR');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-[#F7F5F2] p-6">
            <h2 className="text-4xl font-bold text-[#12714D] mb-8">Olá {usuario.nome}</h2>

            <div className="w-full max-w-md bg-[#12714D] text-white rounded-xl shadow-2xl border-4 border-[#12714D] p-8 space-y-4">
                <p className="text-lg"><span className="font-semibold">Email:</span> {usuario.email}</p>
                <p className="text-lg"><span className="font-semibold">Cargo:</span> {obterNomeGrupoPorId(usuario.groups[0])}</p>
                <p className="text-lg"><span className="font-semibold">Data de Criação:</span> {arrumarData(usuario.data_criacao)}</p>
                <p className="text-lg"><span className="font-semibold">Localização:</span> {usuario.local?.nome || "Sem Local"}</p>
            </div>
        </div>
    );
}