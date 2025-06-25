import React, { useEffect, useState } from "react";
import BotaoNavbarL from "../layout/BotaoNavbarL";
import InputCampo from "../layout/InputCampo";
import CardRegistro from "../layout/CardRegistro"
import { getProdutosEmEstoque } from "../../services/ApiEstoque";

export default function EstoqueHub() {
    const [produtosEmEstoque, setProdutosEmEstoque] = useState([]);

    useEffect(() => {
        getProdutosEmEstoque()
            .then(setProdutosEmEstoque)
            .catch(err => {
                console.error(err);
                alert("Erro ao carregar produtos em estoque");
            });
    }, []);


    return (
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Estoque</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Registro" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Em Estoque" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Entrada" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Saída" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
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
                            <th className="border px-4 py-2">Quantidade</th>
                            <th className="border px-4 py-2">Validade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtosEmEstoque.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border px-4 py-2">{item.nome}</td>
                                <td className="border px-4 py-2">{item.descricao}</td>
                                <td className="border px-4 py-2">{item.fabricante}</td>
                                <td className="border px-4 py-2">{item.categoria}</td>
                                <td className="border px-4 py-2">{item.temperatura}</td>
                                <td className="border px-4 py-2">{item.quantidade_total}</td>
                                <td className="border px-4 py-2">{item.validade}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
