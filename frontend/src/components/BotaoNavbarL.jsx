import React from "react";

export default function BotaoNavbarL({ nome }) {
    return (
        <button
            type="button"
            className="w-48 bg-[#F7F5F2] text-black font-semibold py-2 rounded-lg hover:bg-[#e6e4e2] hover:cursor-pointer transition-colors shadow-sm"
        >
            {nome}
        </button>
    );
}
