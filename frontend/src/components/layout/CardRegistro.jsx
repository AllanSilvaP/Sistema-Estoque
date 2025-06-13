import React from "react";
import BotaoTabela from "./BotaoTabela";

export default function CardRegistro({ dados = [], className = "", onEditar, onDeletar }) {
    return (
        <tr className={`hover:bg-gray-50 ${className}`}>
            {/* Células de dados */}
            {dados.map((item, index) => (
                <td key={index} className="border px-4 py-2">
                    {item}
                </td>
            ))}
            <td className="border px-4 py-2">
                <div className="flex justify-end gap-2">
                    <BotaoTabela nome="✏️" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" 
                        onClick={onEditar}
                    />
                    <BotaoTabela nome="❌" className="bg-[#12714D] text-[#F1F1F1]" corHover="#169966" 
                        onClick={onDeletar}
                    />
                </div>
            </td>
            {/* Célula com botões */}

        </tr>
    );
}
