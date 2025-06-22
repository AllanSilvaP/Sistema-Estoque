import React, {useState} from "react";
import NavbarPagina from '../components/layout/NavBarPagina';
import NavbarLateral from "../components/layout/NavbarLateral";
import EstoqueHub from "../components/hub/EstoqueHub";
import CategoriasHub from "../components/hub/CategoriasHub"
import HistoricoHub from "../components/hub/HistoricoHub"
import ProdutosHub from "../components/hub/ProdutosHub";
import RequisicoesHub from "../components/hub/RequisicoesHub"
import LocaisHub from "../components/hub/LocaisHub";
import LoteHub from "../components/hub/LoteHub"
import PerfilHub from "../components/hub/PerfilHub";
import CadastroHub from "../components/hub/CadastroHub"

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
            case "lote":
                return <LoteHub/>
            case "perfil":
                return <PerfilHub/>
            case "cadastro":
                return <CadastroHub/>
            default:
                return <div className="p-4">Escolha uma opção no menu</div>;
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarPagina />
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
