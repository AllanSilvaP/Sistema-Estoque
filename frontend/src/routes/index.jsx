import React from "react";
import { Routes, Route} from 'react-router-dom';
import Login from '../pages/Login'
import PaginaPrincipal from "../pages/PaginaPrincipal";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/pagina-principal" element={<PaginaPrincipal/>}/>
        </Routes>
    )
}