import React, {useState} from "react";
import Navbar from '../components/Navbar';
import NavbarLateral from "../components/NavbarLateral";
import EstoqueHub from "../components/EstoqueHub";
import CategoriasHub from "../components/CategoriasHub"
import HistoricoHub from "../components/HistoricoHub"
import ProdutosHub from "../components/ProdutosHub";
import RequisicoesHub from "../components/RequisicoesHub"
import LocaisHub from "../components/LocaisHub";

export default function PaginaPrincipal() {
    const [componenteAtivo, setComponenteAtivo] = useState('produtos')

    const renderConteudo = () => {
        switch (componenteAtivo) {
            case "estoque":
                return <EstoqueHub/>
            case "categorias":
                return <CategoriasHub/>
            case "historico":
                return <HistoricoHub/>
            case "produtos":
                return <ProdutosHub/>
            case "requisicoes":
                return <RequisicoesHub/>
            case "local":
                return <LocaisHub/>
            default:
                return <div className="p-4">Escolha uma opção no menu</div>;
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 pt-[60px]">
                <main className="flex-1">
                    {renderConteudo()}
                </main>
                <div className="w-64">
                    <NavbarLateral onSelecionar={setComponenteAtivo}/>
                </div>
            </div>
        </div>
    );
}
