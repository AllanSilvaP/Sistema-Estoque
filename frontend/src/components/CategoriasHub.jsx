import React, {useEffect, useState} from "react";
import BotaoNavbarL from "./BotaoNavbarL";
import InputCampo from "./InputCampo";
import CardRegistro from "./CardRegistro"
import { getCategorias } from "../services/ApiCategorias";

export default function ProdutosHub() {
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
        <div className="flex flex-col h-full w-full bg-[#F7F5F2] p-6 items-center">
            <h2 className="text-2xl font-bold text-[#12714D] mb-4">Categorias</h2>
            <InputCampo placeholder="🔍 Pesquise aqui!" className="w-full max-w-md mb-6" />

            <div className="flex space-x-3">
                <BotaoNavbarL nome="Adicionar Categoria" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" />
                <BotaoNavbarL nome="Filtrar" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966"/>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm mt-5">
                    <thead className="bg-[#12714D] text-[#F1F1F1]">
                        <tr>
                            <th className="border px-4 py-2">Nome</th>
                            <th className="border px-4 py-2">Descrição</th>
                            <th className="border px-4 py-2">Fabricante</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((cat) => (
                            <CardRegistro
                                key={cat.id}
                                dados = {[cat.nome, cat.descricao, cat.tipo]}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

