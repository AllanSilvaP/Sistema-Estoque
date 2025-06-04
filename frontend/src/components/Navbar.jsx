import React from "react";

export default function Navbar () {
    return (
        <nav className="bg-[#12714D] h-[60px] fixed top-0 w-full z-50 flex items-center">
            <div className="flex items-center">
                <img src="LogoSEUBola.png" alt="Logo" className="h-8 sm:h-10 pl-10" />
            </div>
        <ul className="flex justify-around w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base font-bold">
            <li><a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Página Inicial</a></li>
            <li><a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Serviços</a></li>
            <li><a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Contato</a></li>
            <li><a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Login</a></li>
        </ul>
    </nav>
    )
}