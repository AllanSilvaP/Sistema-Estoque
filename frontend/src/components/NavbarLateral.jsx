import React from "react";
import BotaoNavbarL from "./BotaoNavbarL.jsx";

export default function NavbarLateral() {

    return (
        <nav className="w-64 bg-[#12714D] shadow-inner fixed top-[60px] right-0 w-64 h-[calc(100vh-60px)] shadow-lg z-20">
            <ul className="flex flex-col h-full justify-center items-center w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base font-bold space-y-2">
                <li><BotaoNavbarL nome="Estoque"/></li>
                <li><BotaoNavbarL nome="Perfil"/></li>
                <li><BotaoNavbarL nome="Historico"/></li>
                <li><BotaoNavbarL nome="Configurações"/></li>
            </ul>
        </nav>
    )
}