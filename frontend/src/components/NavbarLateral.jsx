import React from "react";
import BotaoNavbarL from "./BotaoNavbarL.jsx";

export default function NavbarLateral() {

    return (
        <nav className="w-64 bg-[#12714D] shadow-inner fixed top-[60px] right-0 w-64 h-[calc(100vh-60px)] shadow-lg z-20">
            <ul className="flex flex-col h-full justify-center items-center w-full list-none m-0 text-xs sm:text-sm py-20 md:text-base font-bold justify-between">
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Estoque"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Requisições"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Relátorios"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Produtos"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Categorias"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Setores"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Perfil"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Historico"/></li>
                <li className="bg-[#F7F5F2]"><BotaoNavbarL nome="Configurações"/></li>
            </ul>
        </nav>
    )
}