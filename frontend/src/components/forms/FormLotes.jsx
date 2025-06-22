import { useEffect, useState } from "react";
import InputCampo from "../layout/InputCampo";
import { getProdutos } from "../../services/ApiProduto";
import { getLocais } from "../../services/ApiLocais";



export default function FormLotes({ onSubmit, form, setForm, onCancel }) {
    const [produtos, setProdutos] = useState([])
    const [locais, setLocais] = useState([])
    function arrumarData(dataValidade) {
        if (!dataValidade) return '';
        const data = new Date(dataValidade);
        return data.toISOString().slice(0, 10);
    }

    // GET PRODUTOS
    useEffect(() => {
        getProdutos()
            .then(setProdutos)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    // GET Locais
    useEffect(() => {
        getLocais()
            .then(setLocais)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.produto}
                onChange={(e) => setForm({ ...form, produto: e.target.value })}
            >
                <option value="">Selecione o Produto</option>
                {produtos.map((cat, idx) => (
                    <option key={idx} value={cat.id}>{cat.nome}</option>
                ))}
            </select>
            <InputCampo
                type="date"
                value={arrumarData(form.data_validade)}
                onChange={(e) => setForm({ ...form, data_validade: e.target.value })}
                placeholder="Data de Validade"
                required
            />
            <InputCampo
                type="number"
                value={form.quantidade}
                onChange={(e) => setForm({ ...form, quantidade: e.target.value === '' ? '' : parseInt(e.target.value) })}
                placeholder="Quantidade"
                required
            />
            <select
            className="w-full border p-2 rounded text-gray-700"
            value={form.armazenado_em}
            onChange={(e) => setForm({...form, armazenado_em: e.target.value})}
            >
                <option value="">Selecione o Produto</option>
                {locais.map((cat, idx) => (
                    <option key={idx}value={parseInt(cat.id)}>{cat.nome}</option>
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
    );
}
