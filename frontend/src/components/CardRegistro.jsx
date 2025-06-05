import React from "react";

export default function CardRegistro({className=''}) {
    return (
        <tr className={`hover:bg-gray-50 ${className}`}>
            <td className="border px-4 py-2">Dipirona Sódica</td>
            <td className="border px-4 py-2">Analgésico e antipirético</td>
            <td className="border px-4 py-2">Neo Química</td>
            <td className="border px-4 py-2">Medicamento</td>
            <td className="border px-4 py-2">15°C a 30°C</td>
            <td className="border px-4 py-2">12/03/2024</td>
            <td className="border px-4 py-2">120</td>
            <td className="border px-4 py-2">10/12/2025</td>
            <td className="border px-4 py-2">Farmácia Central</td>
        </tr>
    );
}
