import { useEffect, useState } from "react";
import InputCampo from "../layout/InputCampo";
import { getLocais } from "../../services/ApiLocais";
import { getPerfil } from "../../services/ApiUsuario";
import { getLotes } from "../../services/ApiLotes"; // Assumo que você tenha essa função

export default function FormRequisicoes({ onSubmit, form, setForm, onCancel }) {
    const [locais, setLocais] = useState([])
    const [perfil, setPerfil] = useState(null)
    const [lotes, setLotes] = useState([])

    // Estado para controle dos itens dentro do form
    // Se form.itens não existir, inicializa com array vazio
    const itens = form.itens || []

    // Estados auxiliares para adicionar novo item
    const [loteSelecionado, setLoteSelecionado] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const adicionarItem = () => {
        if (!loteSelecionado || !quantidade || quantidade <= 0) {
            alert("Escolha lote e quantidade válidos");
            return;
        }
        // Verifica se o lote já está na lista
        const existe = itens.find(item => item.lote === loteSelecionado);
        if (existe) {
            alert("Este lote já foi adicionado");
            return;
        }

        // Atualiza o form com os itens novos
        setForm({
            ...form,
            itens: [...itens, { lote: loteSelecionado, quantidade: parseInt(quantidade) }]
        })

        // Limpa campos
        setLoteSelecionado('')
        setQuantidade('')
    };

    const removerItem = (lote) => {
        setForm({
            ...form,
            itens: itens.filter(item => item.lote !== lote)
        })
    };

    // GET Locais
    useEffect(() => {
        getLocais()
            .then(setLocais)
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar produtos")
            })
    }, [])

    // GET PERFIL
    useEffect(() => {
        getPerfil()
            .then((perfilData) => {
                setPerfil(perfilData)
                setForm((prev) => ({
                    ...prev,
                    solicitante: perfilData.id  // <-- ID do usuário
                }))
            })
            .catch((err) => {
                console.error(err)
                alert("Erro ao carregar perfil")
            })
    }, [])

    // GET Lotes
    useEffect(() => {
        getLotes()
            .then(setLotes)
            .catch(err => {
                console.error(err)
                alert("Erro ao carregar lotes")
            })
    }, [])

    function arrumarData(dataValidade) {
        if (!dataValidade) return '';
        const data = new Date(dataValidade);
        return data.toISOString().slice(0, 10);
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">Solicitante: <strong>{perfil?.nome ?? 'Carregando...'}</strong></p>
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.local_origem}
                onChange={(e) => setForm({ ...form, local_origem: parseInt(e.target.value) })}
            >
                <option value="">Selecione o local de Origem</option>
                {locais.map((cat, idx) => (
                        <option key={idx} value={parseInt(cat.id)}>{cat.nome}</option>
                    ))}
            </select>
            <select
                className="w-full border p-2 rounded text-gray-700"
                value={form.local_destino}
                onChange={(e) => setForm({ ...form, local_destino: parseInt(e.target.value) })}
            >
                <option value="">Selecione o local de Destino</option>
                {locais.map((cat, idx) => (
                    <option key={idx} value={parseInt(cat.id)}>{cat.nome}</option>
                ))}
            </select>
            <input type="hidden" value="Pendente" />
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

            {/* Controle de Itens */}
            <div className="border p-4 rounded">
                <h4 className="font-semibold mb-2">Itens da Requisição</h4>
                <div className="flex space-x-2 mb-4 items-center">
                    <select
                        className="border p-2 rounded flex-grow"
                        value={loteSelecionado}
                        onChange={(e) => setLoteSelecionado(e.target.value)}
                    >
                        <option value="">Selecione um lote</option>
                        {lotes.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.numero_lote} - {l.produto.nome}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        className="border p-2 rounded w-24"
                        placeholder="Qtd"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={adicionarItem}
                        className="bg-green-600 text-white px-4 rounded"
                    >
                        +
                    </button>
                </div>

                <ul>
                    {itens.length === 0 && <li className="text-gray-500">Nenhum item adicionado.</li>}
                    {itens.map(item => {
                        const loteInfo = lotes.find(l => l.id === item.lote);
                        return (
                            <li key={item.lote} className="flex justify-between mb-1 border p-2 rounded">
                                <span>{loteInfo ? `${loteInfo.numero_lote} - ${loteInfo.produto.nome}` : 'Lote não encontrado'}</span>
                                <span>Qtd: {item.quantidade}</span>
                                <button
                                    type="button"
                                    onClick={() => removerItem(item.lote)}
                                    className="text-red-600 font-bold"
                                >
                                    x
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

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
