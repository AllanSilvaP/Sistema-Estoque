import React from "react";
import BotaoNavbarL from "./BotaoNavbarL.jsx";

export default function NavbarLateral({ onSelecionar, usuario}) {

    const botoes = [
        { nome: "Estoque", valor: "estoque" },
        { nome: "Requisições", valor: "requisicoes" },
        { nome: "Relatórios", valor: "relatorios" },
        { nome: "Produtos", valor: "produtos" },
        { nome: "Categorias", valor: "categorias" },
        { nome: "Lotes", valor: "lote" },
        { nome: "Locais", valor: "local" },
        { nome: "Perfil", valor: "perfil" },
        { nome: "Cadastros", valor: "cadastro" },
    ]

    function podeVer(botaoNome) {
    const grupoId = usuario?.groups?.[0];

    const permissoesPorGrupoId = {
        1: ["Estoque", "Requisições", "Relatórios", "Produtos", "Categorias", "Lotes", "Locais", "Perfil", "Cadastros"], // Admin
        2: ["Estoque", "Requisições", "Produtos", "Categorias", "Lotes", "Perfil"], // Gerenciador Local
        3: ["Estoque", "Requisições", "Perfil"], // Operador Local
        4: ["Relatórios", "Perfil"], // Auditor
    };

    return permissoesPorGrupoId[grupoId]?.includes(botaoNome);
}
    return (
        <nav className="w-64 bg-[#12714D] shadow-inner fixed top-[60px] right-0 w-64 h-[calc(100vh-60px)] shadow-lg z-20">
            <ul className="flex flex-col h-full justify-center items-center w-full list-none m-0 text-xs sm:text-sm py-20 md:text-base font-bold justify-between">
                {botoes
                .filter(botao => podeVer(botao.nome))
                .map((botao) => {
                    return (
                        <li key={botao.valor}>
                        <BotaoNavbarL
                            nome={botao.nome}
                            onClick = {() => onSelecionar(botao.valor)}
                            className="bg-[#F7F5F2]"
                        />
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}