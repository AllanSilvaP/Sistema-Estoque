import React from "react";
import BotaoNavbarL from "./BotaoNavbarL";
import InputCampo from "./InputCampo";
import CardRegistro from "./CardRegistro"

export default function ProdutosHub() {
    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Estoque</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Registro" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Em Estoque" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966"/>
                <BotaoNavbarL nome="Entrada" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966"/>
                <BotaoNavbarL nome="Saída" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966"/>
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966"/>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Descrição</th>
                            <th className="border px-4 py-2">Fabricante</th>
                            <th className="border px-4 py-2">Categoria</th>
                            <th className="border px-4 py-2">Temperatura</th>
                            <th className="border px-4 py-2">Criado em</th>
                            <th className="border px-4 py-2">Quantidade</th>
                            <th className="border px-4 py-2">Validade</th>
                            <th className="border px-4 py-2">Origem</th>
                        </tr>
                    </thead>

                    <tbody>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                        <CardRegistro/>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

