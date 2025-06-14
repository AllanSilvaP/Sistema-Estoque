import React, { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL";
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import FormLotes from "../forms/FormLotes"
import { getLotes, submitLotes, editLotes, deleteLotes } from "../../services/ApiLotes";

export default function LocaisHub() {
    const [lotes, setLotes] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        produto: '',
        numero_lote: '',
        data_validade: '',
        quantidade: '',
        origem: '',
        armazenado_em: '',
    })

    // GET PRODUTOS
    useEffect(() => {
        getLotes()
            .then(setLotes)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    // submitLocais e Edit Cadastro
    const submitLote = async (e) => {
        e.preventDefault()

        try {
            const { nome, ...formSemNome } = form
            if (modoEdicao) {
                const loteAtualizado = await editLotes(formSemNome)
                setLotes(lotes.map(cat => cat.id === loteAtualizado.id ? loteAtualizado : cat))
            } else {
                const novoCad = await submitLotes(formSemNome)
                setLotes([...lotes, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({
                produto: '',
                numero_lote: '',
                data_validade: '',
                quantidade: '',
                origem: '',
                armazenado_em: '',
            })
        } catch (err) {
            console.error(err)
            alert("Erro ao cadastrar")
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Lotes</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Lote" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Numero Lote</th>
                            <th className="border px-4 py-2">Data Validade</th>
                            <th className="border px-4 py-2">Quantidade</th>
                            <th className="border px-4 py-2">Origem</th>
                            <th className="border px-4 py-2">Armazenado em</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lotes.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados={[cat.produto.nome, cat.numero_lote, cat.data_validade, cat.quantidade, cat.origem, cat.armazenado_em.nome]}
                                onEditar={() => {
                                    const { nome, armazenado_em, produto, ...rest } = cat
                                    setForm({
                                        ...rest,
                                        produto: produto.id,
                                        armazenado_em: armazenado_em.id
                                    })
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteLotes(cat.id)
                                        setLotes(lotes.filter(c => c.id !== cat.id))
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
                        <FormLotes
                            onSubmit={submitLote}
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

