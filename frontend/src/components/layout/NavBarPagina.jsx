export default function Navbar() {
    return (
        <nav className="bg-[#12714D] h-[60px] fixed top-0 w-full z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4">
                {/* Esquerda */}
                <div className="text-xs sm:text-sm md:text-base font-bold">
                    <img src="LogoSEUBola.png" alt="Logo" className="h-8 sm:h-10" />
                </div>

                {/* Direita - Agora alinhado à esquerda dentro de seu próprio contêiner */}
                <div className="text-xs sm:text-sm md:text-base font-bold flex justify-end w-full"> {/* Adicionado flex justify-end w-full */}
                    <a href="#" className="text-[#F1F1F1] hover:text-[#FFC100]">Login</a>
                </div>
            </div>
        </nav>
    );
}