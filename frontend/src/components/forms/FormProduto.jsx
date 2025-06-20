import { useEffect, useState } from "react";
import InputCampo from "../layout/InputCampo";
import { getCategorias} from "../../services/ApiCategorias";

export default function FormProduto({ onSubmit, form, setForm, onCancel }) {
    const [categorias, setCategorias] = useState([])

    // GET CATEGORIAS
        useEffect(() => {
            getCategorias()
                .then(setCategorias)
                .catch((err) => {
                    console.error(err)
                    alert("Erro ao carregar categorias")
                })
        }, [])
    
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Nome"
            />
            <textarea
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full border p-2 rounded"
            />
            <InputCampo
                type="text"
                value={form.codigo_barras}
                onChange={(e) => setForm({ ...form, codigo_barras: e.target.value })}
                placeholder="Codigo de Barras"
            />
            <InputCampo
                type="text"
                value={form.fabricante}
                onChange={(e) => setForm({ ...form, fabricante: e.target.value })}
                placeholder="Fabricante"
            />
            <select
            className="w-full border p-2 rounded text-gray-700"
            value={form.categoria}
            onChange={(e) => setForm({...form, categoria: e.target.value})}
            >
                <option value="">Selecione a Categoria</option>
                {categorias.map((cat, idx) => (
                    <option key={idx}value={parseInt(cat.id)}>{cat.nome}</option>
                ))}
            </select>
            <InputCampo
                type="text"
                value={form.temperatura_armazenamento + "°C"}
                onChange={(e) => {
                    const raw = e.target.value.replace(/[^-\d]/g, "");
                    setForm({ ...form, temperatura_armazenamento: raw });
                }}
                placeholder="Temperatura de armazenamento"
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
