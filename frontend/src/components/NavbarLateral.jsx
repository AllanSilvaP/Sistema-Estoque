import React from "react";
import BotaoNavbarL from "./BotaoNavbarL.jsx";

export default function NavbarLateral() {

    return (
        <nav className="w-64 bg-[#12714D] shadow-inner fixed top-[60px] right-0 w-64 h-[calc(100vh-60px)] shadow-lg z-20">
            <ul className="flex flex-col h-full justify-center items-center w-full list-none m-0 text-xs sm:text-sm py-20 md:text-base font-bold justify-between">
                <li><BotaoNavbarL nome="Estoque" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Requisições" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Relátorios" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Produtos" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Categorias" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Setores" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Perfil" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Historico" className="bg-[#F7F5F2]"/></li>
                <li><BotaoNavbarL nome="Configurações" className="bg-[#F7F5F2]"/></li>
            </ul>
        </nav>
    )
}