import React from "react";
import BotaoNavbarL from "./BotaoNavbarL.jsx";

export default function NavbarLateral({ onSelecionar}) {

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
    return (
        <nav className="w-64 bg-[#12714D] shadow-inner fixed top-[60px] right-0 w-64 h-[calc(100vh-60px)] shadow-lg z-20">
            <ul className="flex flex-col h-full justify-center items-center w-full list-none m-0 text-xs sm:text-sm py-20 md:text-base font-bold justify-between">
                {botoes.map((botao) => {
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