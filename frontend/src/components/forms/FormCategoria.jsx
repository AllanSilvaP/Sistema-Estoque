import React from "react";
import InputCampo from "../layout/InputCampo";

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
                value={form.tipo}
                onChange={(e) => setForm({...form, tipo: e.target.value})}
                placeholder="Tipo"
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
