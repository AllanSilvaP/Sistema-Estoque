import React from "react";
import BotaoTabela from "./BotaoTabela";

export default function CardRegistro({ dados = [], className = "" }) {
    return (
        <tr className={`hover:bg-gray-50 ${className}`}>
            {/* Células de dados */}
            {dados.map((item, index) => (
                <td key={index} className="border px-4 py-2">
                    {item}
                </td>
            ))}

            {/* Célula com botões */}
            <td className="border px-4 py-2 whitespace-nowrap">
                <div className="flex gap-2">
                    <BotaoTabela nome="✏️" />
                    <BotaoTabela nome="❌" />
                </div>
            </td>
        </tr>
    );
}
