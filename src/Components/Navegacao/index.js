import React from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConfig.js"
import './nav.css'

export default function Navegacao({setView}){

const navigate = useNavigate()

function handleLogout(){
        auth.signOut();
        navigate('/', {replace: true})
 
}


    return(
        <div>
            <nav className="navegacao">
                 <button className="btn-nav" onClick={()=> setView('telaInicial')}>ProjEstoque</button> 
                <div className="navlink">
                <button className="btn-nav" onClick={()=> setView('formCadastro')}>Cadastrar</button> 
                <button className="btn-nav" onClick={()=> setView('formEstoque')}>Estoque</button> 
                <button
                className="btn-logout"
                 onClick={handleLogout}
                >Sair</button>
                </div>
            </nav>
        </div>
    )
}