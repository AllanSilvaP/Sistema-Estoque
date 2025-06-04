import React from "react";
import Navbar from '../components/Navbar'
import NavbarLateral from "../components/NavbarLateral";

export default function PaginaPrincipal() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex flex-1 pt-[60px]">
                <main className="text-2x1 font-bold">
                    <div>
                        
                    </div>
                </main>

                <div>
                    <NavbarLateral/>
                </div>
            </div>
        </div>
    )
}