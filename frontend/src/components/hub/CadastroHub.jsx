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
    });

    useEffect(() => {
        getUsuarios()
            .then(setUsuarios)
            .catch(() => alert("Erro ao carregar usuários"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modoEdicao) {
                const userAtualizado = await editUsuarios(form.id, form);
                setUsuarios(usuarios.map(u => u.id === userAtualizado.id ? userAtualizado : u));
            }
            setModalAberto(false);
            setModoEdicao(false);
            setForm({ nome: "", email: "", senha: "", ativo: true });
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar usuário");
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Categorias</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Categoria" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Senha</th>
                            <th className="border px-4 py-2">Cargo</th>
                            <th className="border px-4 py-2">Local Registrado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => (
                            <CardRegistro
                                key={u.id}
                                dados={[u.nome, u.descricao, u.tipo]}
                                onEditar={() => {
                                    setForm(u)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteUsuarios(u.id)
                                        setUsuarios(usuarios.filter(u => u.id !== u.id))
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
                        <h3 className="text-lg font-bold mb-4 text-[#12714D]">Nova Categoria</h3>
                        <FormUsuario
                            onSubmit={cadastrarUsuario}
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

