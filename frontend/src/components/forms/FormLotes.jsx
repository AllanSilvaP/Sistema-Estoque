import React from "react";
import InputCampo from "../layout/InputCampo";

export default function FormLotes({ onSubmit, form, setForm, onCancel }) {
    function arrumarData(dataValidade) {
        if (!dataValidade) return '';
        const data = new Date(dataValidade);
        return data.toISOString().slice(0, 10);
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputCampo
                type="text"
                value={form.produto}
                onChange={(e) => setForm({ ...form, produto: e.target.value })}
                placeholder="Nome"
                required
            />
            <InputCampo
                type="text"
                value={form.numero_lote}
                onChange={(e) => setForm({ ...form, numero_lote: e.target.value })}
                placeholder="Número do Lote"
                required
            />
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
            <InputCampo
                type="text"
                value={form.origem}
                onChange={(e) => setForm({ ...form, origem: e.target.value })}
                placeholder="Origem"
                required
            />
            <InputCampo
                type="text"
                value={form.armazenado_em}
                onChange={(e) => setForm({ ...form,armazenado_em: e.target.value })}
                placeholder="ID do Local de Estocagem"
                required
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
    );
}
