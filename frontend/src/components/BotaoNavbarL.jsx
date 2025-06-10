import React from "react";

export default function BotaoNavbarL({ nome, className  = '', corHover="#e6e4e2", onClick}) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`w-48 font-semibold py-2 rounded-lg hover:bg-[${corHover}] hover:cursor-pointer transition-colors shadow-sm ${className}`}
        >
            {nome}
        </button>
    );
}
