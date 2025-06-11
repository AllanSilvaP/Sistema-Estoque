import React, { useEffect, useState } from "react";
import BotaoNavbarL from "./BotaoNavbarL"
import InputCampo from "./InputCampo";
import CardRegistro from "./CardRegistro"
import FormCategoria from "./FormCategoria";
import { getCategorias, submitCategorias, editCategorias, deleteCategorias } from "../services/ApiCategorias";

export default function CategoriasHub() {
    const [categorias, setCategorias] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        tipo: '',
    })

    // GET CATEGORIAS
    useEffect(() => {
        getCategorias()
            .then(setCategorias)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar categorias")
            })
    }, [])

    // submitCadastros e Edit Cadastro
    const submitCadastro = async (e) => {
        e.preventDefault()
        try {
            if (modoEdicao) {
                const categoriaAtualizada = await editCategorias(form)
                setCategorias(categorias.map(cat => cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat))
            } else {
                const novoCad = await submitCategorias(form)
                setCategorias([...categorias, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({ nome: '', descricao: '', tipo: '' })
        } catch (err) {
            console.error(err)
            alert("Erro ao cadastrar")
        }
    }

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
                            <th className="border px-4 py-2">Descrição</th>
                            <th className="border px-4 py-2">Tipo</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados={[cat.nome, cat.descricao, cat.tipo]}
                                onEditar={() => {
                                    setForm(cat)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteCategorias(cat.id)
                                        setCategorias(categorias.filter(c => c.id !== cat.id))
                                    } catch (err) {
                                        console.error(err)
                                        alert("Erro ao deletar categoria")
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
                        <FormCategoria
                            onSubmit={submitCadastro}
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

