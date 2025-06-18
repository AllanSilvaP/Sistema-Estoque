import React, { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL";
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import FormRequisicoes from "../forms/FormRequisicoes"
import { getRequisicoes, submitRequisicoes, editRequisicoes, deleteRequisicoes } from "../../services/ApiRequisicoes"

export default function RequisicoesHub() {
    const [requisicoes, setRequisicoes] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        solicitante: '',
        local_origem: '',
        local_destino: '',
        status: '',
        data_requisicao: '',
        observacao: '',
    })

    // GET Requisições
    useEffect(() => {
        getRequisicoes()
            .then(setRequisicoes)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar as requisições")
            })
    }, [])

    // submitLocais e Edit Cadastro
    const submitRequisicao = async (e) => {
        e.preventDefault()
        try {
            if (modoEdicao) {
                const requisicaoAtualizada = await editRequisicoes(form)
                setRequisicoes(requisicoes.map(cat => cat.id === requisicaoAtualizada.id ? requisicaoAtualizada : cat))
            } else {
                const novoCad = await submitRequisicoes(form)
                setRequisicoes([...requisicoes, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({
                solicitante: '',
                local_origem: '',
                local_destino: '',
                status: '',
                data_requisicao: '',
                observacao: '',
            })
        } catch (err) {
            console.error(err)
            console.log("Form sendo enviado:", form)
            alert("Erro ao cadastrar")
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Requisicoes</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Requisicoes" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Solicitante</th>
                            <th className="border px-4 py-2">Local Origem</th>
                            <th className="border px-4 py-2">Local Destino</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Data Requisicao</th>
                            <th className="border px-4 py-2">Observação</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requisicoes.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados={[cat.solicitante.nome, cat.local_origem.nome, cat.local_destino.nome, cat.status, cat.data_requisicao, cat.observacao]}
                                onEditar={() => {
                                    setForm(cat)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteRequisicoes(cat.id)
                                        setRequisicoes(requisicoes.filter(c => c.id !== cat.id))
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
                        <h3 className="text-lg font-bold mb-4 text-[#12714D]">Nova Requisicao</h3>
                        <FormRequisicoes
                            onSubmit={submitRequisicao}
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

