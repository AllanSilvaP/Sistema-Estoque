import React from "react";
import InputCampo from "../layout/InputCampo";

export default function FormCategoria({ onSubmit, form, setForm, onCancel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Nome"
            />
            <InputCampo
                type="text"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                placeholder="Tipo"
            />
            <InputCampo
                type="text"
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                placeholder="Endereço"
            />
            <InputCampo
                type="number"
                value={form.capacidade_maxima}
                onChange={(e) => setForm({ ...form, capacidade_maxima: e.target.value === '' ? '' : parseInt(e.target.value) })}
                placeholder="Capacidade Maxima"
            />
            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Temperatura controlada</label>
                <input
                    type="checkbox"
                    checked={form.temperatura_controlada}
                    onChange={(e) => setForm({ ...form, temperatura_controlada: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
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
