import React from "react";

export default function BotaoNavbarL ({nome}) {
    return (
        <button type="button" className="bg-[#F7F5F2] text-black font-semibold py-2 px-4 rounded hover:bg-[#e6e4e2] hover:cursor-pointer transition-colors">{nome}</button>
    )
}