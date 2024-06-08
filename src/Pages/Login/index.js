import React, {useState} from "react";
import { auth } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import bannerBody from "../../assets/images/planodefundo.jpg"
import './login.css'



export default function LoginUser(){
    
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault();

        if(email !== '' && senha !== ''){
            await signInWithEmailAndPassword(auth,email,senha)
            .then(()=>{
                navigate('/home', {replace:true})
            })
            .catch((error)=>{
                console.log("erro ao logar", error)
                toast.info('Email ou senha incorretos, verifique suas credenciais!', {
                    position:"top-center",
                    autoClose: 5000, // 5 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored'
                  })
            })
        }
        else{
            toast.warning('preencha todos os campos!', {
                position:"top-center",
                autoClose: 5000, // 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            
        }
    }
    
    
    return (
        <div>
             <img src={bannerBody}
            style={{
                height:'100vh',
                backgroundSize: 'cover', // Faz a imagem cobrir todo o fundo
                backgroundPosition: 'center', // Centraliza a imagem
                position:'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}/>
        <form className="loginForm" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="Digite seu email..."
          />
          <input
          type="password"
          value={senha}
          onChange={(e)=> setSenha(e.target.value)}
          placeholder="Digite sua senha..."
          />
          <button type="submit">Login</button>

          <p>Não possui cadastro?<Link className="linkCadastro" to='/cadastro'>
            Cadastre-se!
        </Link></p>
        </form> 
        </div>
    )
}