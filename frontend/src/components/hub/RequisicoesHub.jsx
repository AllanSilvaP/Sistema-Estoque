import React, { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL";
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import FormRequisicoes from "../forms/FormRequisicoes"
import { getRequisicoes, submitRequisicoes, editRequisicoes, deleteRequisicoes } from "../../services/ApiRequisicoes"
import { getPerfil } from "../../services/ApiUsuario";
import BotaoTabela from "../layout/BotaoTabela"

export default function RequisicoesHub() {
    const [requisicoes, setRequisicoes] = useState([])
    const [perfil, setPerfil] = useState(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        solicitante: '',
        local_origem: '',
        local_destino: '',
        status: 'Pendente',
        data_requisicao: '',
        observacao: '',
    })


    useEffect(() => {
        getRequisicoes()
            .then((data) => {
                console.log(data)
                setRequisicoes(data);
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao carregar as requisições");
            });
    }, []);

    // submitLocais e Edit Cadastro
    const submitRequisicao = async (e) => {
        e.preventDefault()
        try {
            if (modoEdicao) {
                const requisicaoAtualizada = await editRequisicoes(form)
                setRequisicoes(requisicoes.map(cat => cat.id === requisicaoAtualizada.id ? requisicaoAtualizada : cat))
            } else {
                const novoCad = await submitRequisicoes(form)
                console.log("NOVO CAD", novoCad)
                setRequisicoes([...requisicoes, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({
                solicitante: '',
                local_origem: '',
                local_destino: '',
                status: 'Pendente',
                data_requisicao: '',
                observacao: '',
            })
        } catch (err) {
            console.error(err)
            console.log(form)
            alert("Erro ao cadastrar")
        }
    }

    

    const handleStatus = async (id, novoStatus) => {
        try {
            const atual = requisicoes.find(r => r.id === id);

            // Preparar objeto para envio
            const atualizado = {
                id: atual.id,
                solicitante: atual.solicitante.id,       // só o id
                local_origem: atual.local_origem.id,
                local_destino: atual.local_destino.id,
                status: novoStatus,
                data_requisicao: atual.data_requisicao,
                observacao: atual.observacao,
            };

            const resposta = await editRequisicoes(atualizado);

            setRequisicoes(requisicoes.map(r => (r.id === id ? resposta : r)));
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar status");
        }
    };



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
                            <th className="border px-4 py-2">Itens</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requisicoes
                            .filter(r => r.status === "Pendente")
                            .map((cat) => (
                                <CardRegistro
                                    key={cat.id}
                                    dados={[
                                        cat.solicitante?.nome ?? '---',
                                        cat.local_origem?.nome ?? '---',
                                        cat.local_destino?.nome ?? '---',
                                        cat.status,
                                        cat.data_requisicao,
                                        cat.observacao,
                                        cat.itens.length > 0
                                            ? cat.itens.map((i) =>
                                                `${i.lote?.numero_lote ?? '?'} - Qtd ${i.quantidade} - Prd ${i.lote?.produto?.nome ?? '?'}`
                                            ).join(", ")
                                            : "Nenhum item"
                                    ]}
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
                                    acoesExtra={
                                        <>
                                            <BotaoTabela
                                                nome="Aprovar"
                                                className="bg-[#12714D] text-[#F1F1F1]"
                                                corHover="#169966"
                                                onClick={() => handleStatus(cat.id, "Aprovada")}
                                            />
                                            <BotaoTabela
                                                nome="Reprovar"
                                                className="bg-red-600 text-white"
                                                corHover="#b91c1c"
                                                onClick={() => handleStatus(cat.id, "Reprovada")}
                                            />
                                        </>
                                    }
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

