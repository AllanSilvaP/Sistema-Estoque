import { useEffect, useState } from "react";
import InputCampo from "../layout/InputCampo";
import { getLocais } from "../../services/ApiLocais";



export default function FormProduto({ onSubmit, form, setForm, onCancel }) {
    const [locais, setLocais] = useState([])
    // GET Locais
    useEffect(() => {
        getLocais()
            .then(setLocais)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    function arrumarData(dataValidade) {
        if (!dataValidade) return '';
        const data = new Date(dataValidade);
        return data.toISOString().slice(0, 10);
    }
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.solicitante}
                onChange={(e) => setForm({ ...form, solicitante: e.target.value })}
                placeholder="ID USUARIO"
            />
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.local_origem}
                onChange={(e) => setForm({ ...form, local_origem: e.target.value })}
            >
                <option value="">Selecione o local de Origem</option>
                {locais
                .filter((cat) => cat.id !== parseInt(form.local_origem))
                .map((cat, idx) => (
                    <option key={idx}value={parseInt(cat.id)}>{cat.nome}</option>
                ))}
            </select>
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.local_destino}
                onChange={(e) => setForm({ ...form, local_destino: e.target.value })}
            >
                <option value="">Selecione o local de Destino</option>
                {locais.map((cat, idx) => (
                    <option key={idx}value={parseInt(cat.id)}>{cat.nome}</option>
                ))}
            </select>
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
                <option value="">Selecione a Categoria</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
                <option value="Em analise">Em analise</option>
            </select>
            <InputCampo
                type="date"
                value={arrumarData(form.data_requisicao)}
                onChange={(e) => setForm({ ...form, data_requisicao: e.target.value })}
                placeholder="Data de Requisicao"
                required
            />
            <textarea
                value={form.observacao}
                onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Observação"
            />
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
    )
}
