import React, { useEffect, useState } from "react";
import BotaoNavbarL from "./BotaoNavbarL";
import InputCampo from "./InputCampo";
import CardRegistro from "./CardRegistro"
import FormLocais from "./FormLocais"
import { getLocais, submitLocais, editLocais, deleteLocais } from "../services/ApiLocais";

export default function LocaisHub() {
    const [locais, setLocais] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        nome: '',
        tipo: '',
        endereco: '',
        capacidade_maxima: '',
        temperatura_controlada: '',
    })

    // GET PRODUTOS
    useEffect(() => {
        getLocais()
            .then(setLocais)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    // submitLocais e Edit Cadastro
    const submitLocal = async (e) => {
        e.preventDefault()
        try {
            if (modoEdicao) {
                const localAtualizado = await editLocais(form)
                setLocais(locais.map(cat => cat.id === localAtualizado.id ? localAtualizado : cat))
            } else {
                const novoCad = await submitLocais(form)
                setLocais([...locais, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({
                nome: '',
                tipo: '',
                endereco: '',
                capacidade_maxima: '',
                temperatura_controlada: '',
            })
        } catch (err) {
            console.error(err)
            alert("Erro ao cadastrar")
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Localidades</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Local" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Tipo</th>
                            <th className="border px-4 py-2">Endereço</th>
                            <th className="border px-4 py-2">Capacidade Maxima</th>
                            <th className="border px-4 py-2">Temperatura Controlada</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {locais.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados={[cat.nome, cat.tipo, cat.endereco, cat.capacidade_maxima, cat.temperatura_controlada]}
                                onEditar={() => {
                                    setForm(cat)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteLocais(cat.id)
                                        setLocais(locais.filter(c => c.id !== cat.id))
                                    } catch (err) {
                                        console.error(err)
                                        alert("Erro ao deletar Produtos")
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
                        <h3 className="text-lg font-bold mb-4 text-[#12714D]">Nova Localidade</h3>
                        <FormLocais
                            onSubmit={submitLocal}
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

