import React from "react";
import Navbar from '../components/Navbar';
import NavbarLateral from "../components/NavbarLateral";
import ProdutosHub from "../components/ProdutosHub";

export default function PaginaPrincipal() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 pt-[60px]">
                <main className="flex-1">
                    <ProdutosHub/>
                </main>
                <div className="w-64">
                    <NavbarLateral/>
                </div>
            </div>
        </div>
    );
}
