export default function Navbar() {
    return (
        <nav className="bg-[#12714D] h-[60px] fixed top-0 w-full z-50 flex items-center justify-between px-6">
            {/* Esquerda */}
            <div className="text-xs sm:text-sm md:text-base font-bold">
                <a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Página Inicial</a>
            </div>

            {/* Centro */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <img src="LogoSEUBola.png" alt="Logo" className="h-8 sm:h-10" />
            </div>

            {/* Direita */}
            <div className="text-xs sm:text-sm md:text-base font-bold">
                <a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Login</a>
            </div>
        </nav>
    );
}
