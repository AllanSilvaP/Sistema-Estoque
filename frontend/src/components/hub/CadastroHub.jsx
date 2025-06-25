import { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL"
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import FormUsuario from "../forms/FormUsuarios";
import { getUsuarios, editUsuarios, deleteUsuarios, cadastrarUsuario } from "../../services/ApiUsuario";

export default function CadastroHub() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        ativo: true,
        local: "",
        groups: [],
    });

    useEffect(() => {
        getUsuarios()
            .then(data => {
                setUsuarios(data)
            })
            .catch(() => alert("Erro ao carregar usuários"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modoEdicao) {
                const userAtualizado = await editUsuarios(form.id, form);
                setUsuarios(usuarios.map(u => u.id === userAtualizado.id ? userAtualizado : u));
            } else {
                const novoCad = await cadastrarUsuario({ ...form, local: parseInt(form.local) })
                setUsuarios([...usuarios, novoCad])
            }
            setModalAberto(false);
            setModoEdicao(false);
            setForm({
                nome: "",
                email: "",
                senha: "",
                ativo: true,
                local: "",
                groups: [],
            });
        } catch (err) {
            console.error(err);
            console.log("Form sendo enviado:", form)
            alert("Erro ao salvar usuário");
        }
    };

    const arrumarData = (data) => {
        const d = new Date(data);
        return isNaN(d.getTime()) ? "Data inválida" : d.toLocaleDateString('pt-BR');
    };

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

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Usuarios</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Cadastrar Usuario" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Data de Criação</th>
                            <th className="border px-4 py-2">Local Registrado</th>
                            <th className="border px-4 py-2">Cargo</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => (
                            <CardRegistro
                                key={u.id}
                                dados={[u.nome, u.email, arrumarData(u.data_criacao), u.local?.nome || "Sem Local", obterNomeGrupoPorId(u.groups[0])]}
                                onEditar={() => {
                                    setForm(u)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteUsuarios(u.id)
                                        setUsuarios(usuarios.filter(user => user.id !== u.id))
                                    } catch (err) {
                                        console.error(err)
                                        alert("Erro ao deletar usuarios")
                                    }
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4 text-[#12714D]">Novo Usuario</h3>
                        <FormUsuario
                            onSubmit={handleSubmit}
                            form={form}
                            setForm={setForm}
                            onCancel={() => setModalAberto(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

