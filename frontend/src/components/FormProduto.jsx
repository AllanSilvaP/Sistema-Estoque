import React from "react";
import InputCampo from "./InputCampo";

export default function FormCategoria ({ onSubmit, form, setForm, onCancel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
                placeholder="Nome"
            />
            <textarea 
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) => setForm({...form, descricao: e.target.value})}
                className="w-full border p-2 rounded"
            />
            <InputCampo
                type="text"
                value={form.codigo_barras}
                onChange={(e) => setForm({...form, codigo_barras: e.target.value})}
                placeholder="Codigo de Barras"
            />
            <InputCampo
                type="text"
                value={form.fabricante}
                onChange={(e) => setForm({...form, fabricante: e.target.value})}
                placeholder="Fabricante"
            />
            <InputCampo
                type="text"
                value={form.categoria}
                onChange={(e) => setForm({...form, categoria: e.target.value})}
                placeholder="Codigo de Barras"
            />
            <InputCampo
                type="text"
                value={form.temperatura_armazenamento}
                onChange={(e) => setForm({...form, temperatura_armazenamento: e.target.value})}
                placeholder="Temperatura de armazenamento"
            />
            <InputCampo
                type="text"
                value={form.criado_em}
                onChange={(e) => setForm({...form, criado_em: e.target.value})}
                placeholder="editado em"
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
