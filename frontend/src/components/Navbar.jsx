import React from "react";

export default function Navbar () {
    return (
        <nav className="bg-[#333333] h-[60px] fixed top-0 w-full z-50 flex items-center">
        <ul className="flex justify-around w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base">
            <li><a href="#" className="text-[#f5f5f5] hover:text-[#FFC100]">Página Inicial</a></li>
            <li><a href="#" className="text-[#f5f5f5] hover:text-[#FFC100]">Serviços</a></li>
            <li><a href="#" className="text-[#f5f5f5] hover:text-[#FFC100]">Contato</a></li>
            <li><a href="#" className="text-[#f5f5f5] hover:text-[#FFC100]">Login</a></li>
        </ul>
    </nav>
    )
}