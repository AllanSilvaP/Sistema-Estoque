import React, { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL";
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import FormProduto from "../forms/FormProduto"
import { deleteProdutos, editProdutos, getProdutos, submitProdutos } from "../../services/ApiProduto";

export default function ProdutosHub() {
    const [produtos, setProdutos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        codigo_barras: '',
        fabricante: '',
        categoria: '',
        temperatura_armazenamento: '',
        criado_em: '',
    })

    // GET PRODUTOS
    useEffect(() => {
        getProdutos()
            .then(setProdutos)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    // submitCadastros e Edit Cadastro
    const submitProduto = async (e) => {
        e.preventDefault()
        try {
            if (modoEdicao) {
                const produtoAtualizado = await editProdutos(form)
                setProdutos(produtos.map(cat => cat.id === produtoAtualizado.id ? produtoAtualizado : cat))
            } else {
                const novoCad = await submitProdutos(form)
                setProdutos([...produtos, novoCad])
            }
            setModalAberto(false)
            setModoEdicao(false)
            setForm({
                nome: '',
                descricao: '',
                codigo_barras: '',
                fabricante: '',
                categoria: '',
                temperatura_armazenamento: '',
                criado_em: '',
            })
        } catch (err) {
            console.error(err)
            console.log("Form sendo enviado:", form)
            alert("Erro ao cadastrar")
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Produtos</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Produto" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" onClick={() => setModalAberto(true)} />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Descrição</th>
                            <th className="border px-4 py-2">Codigo Barras</th>
                            <th className="border px-4 py-2">Fabricante</th>
                            <th className="border px-4 py-2">Categoria</th>
                            <th className="border px-4 py-2">Temperatura Armazenamento</th>
                            <th className="border px-4 py-2">Criado em</th>
                            <th className="border px-4 py-2">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados={[cat.nome, cat.descricao, cat.codigo_barras, cat.fabricante, cat.categoria.nome, cat.temperatura_armazenamento, cat.criado_em]}
                                onEditar={() => {
                                    setForm(cat)
                                    setModoEdicao(true)
                                    setModalAberto(true)
                                }}
                                onDeletar={async () => {
                                    try {
                                        await deleteProdutos(cat.id)
                                        setProdutos(produtos.filter(c => c.id !== cat.id))
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
                        <h3 className="text-lg font-bold mb-4 text-[#12714D]">Novo Produto</h3>
                        <FormProduto
                            onSubmit={submitProduto}
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

