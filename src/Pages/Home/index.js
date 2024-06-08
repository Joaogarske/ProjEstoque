import React, { useState } from 'react';
import Cadastro from '../Cadastro/index.js';
import Estoque from '../Estoque/index.js';
import Navegacao from '../../Components/Navegacao/index.js';
import logoTelaInicial from '../../assets/images/logoTelaInicial.png'
import './home.css'

const Home = () => {
  const [view, setView] = useState('telaInicial');


function TelaInicial(){
  return(
    <div className='telaInicial'>
      <div className='text-telaInicial'>
      <h1>Olá seja bem vindo
         <br/>ao ProjEstoque!</h1>
         <p>Gerencie seu estoque com facilidade e eficiência.</p>
         <p>Adicione, remova e acompanhe seus produtos em um só lugar.</p>
         <p className='text-cadastrar'>Vamos cadastrar!<button onClick={()=>setView('formCadastro')}>Cadastrar</button></p>
      </div>
       <img src={logoTelaInicial} />
    </div>
  )
}




  return (
    <div>
      <Navegacao setView={setView} />
      <div>
        {view === 'telaInicial' && <TelaInicial/>}
        {view === 'formCadastro' && <Cadastro/>}
        {view === 'formEstoque' && <Estoque/> }
      </div>
    </div>
  );
};

export default Home;