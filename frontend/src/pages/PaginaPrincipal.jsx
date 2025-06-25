import { useState, useEffect } from "react";
import NavbarPagina from "../components/layout/NavBarPagina";
import NavbarLateral from "../components/layout/NavbarLateral";
import EstoqueHub from "../components/hub/EstoqueHub";
import CategoriasHub from "../components/hub/CategoriasHub";
import ProdutosHub from "../components/hub/ProdutosHub";
import RequisicoesHub from "../components/hub/RequisicoesHub";
import LocaisHub from "../components/hub/LocaisHub";
import LoteHub from "../components/hub/LoteHub";
import PerfilHub from "../components/hub/PerfilHub";
import CadastroHub from "../components/hub/CadastroHub";
import RelatoriosHub from "../components/hub/RelatoriosHub"
import { getPerfil } from "../services/ApiUsuario";

export default function PaginaPrincipal() {
    const [componenteAtivo, setComponenteAtivo] = useState("produtos");
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        getPerfil()
            .then(setUsuario)
            .catch((err) => {
                console.error("Erro ao carregar perfil", err);
                alert("Erro ao carregar perfil do usuário.");
            });
    }, []);

    const renderConteudo = () => {
        switch (componenteAtivo) {
            case "estoque":
                return <EstoqueHub />;
            case "categorias":
                return <CategoriasHub />;
            case "produtos":
                return <ProdutosHub />;
            case "requisicoes":
                return <RequisicoesHub />;
            case "local":
                return <LocaisHub />;
            case "lote":
                return <LoteHub />;
            case "perfil":
                return <PerfilHub usuario={usuario} />; // ✅ Aqui passamos o usuário
            case "cadastro":
                return <CadastroHub />;
            case "relatorios":
                return <RelatoriosHub/>
            default:
                return <div className="p-4">Escolha uma opção no menu</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarPagina />
            <div className="flex flex-1 pt-[60px]">
                <main className="flex-1">{renderConteudo()}</main>
                <div className="w-64">
                    {usuario && (
                        <NavbarLateral
                            onSelecionar={setComponenteAtivo}
                            usuario={usuario} // ✅ Enviando dados para controle de botões
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
