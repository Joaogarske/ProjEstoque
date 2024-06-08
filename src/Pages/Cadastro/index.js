import { useState } from "react"
import './cadastro.css'
import { addDoc,collection } from "firebase/firestore"
import { db } from "../../firebaseConfig.js";
import { toast } from "react-toastify";



export default function Form(){
   
const [categoria,setcategoria] = useState('')    
const [codigo,setCodigo] = useState('')
const [nomeProduto, setNomeProduto] = useState('')
const [detalhes, setDetalhes] = useState('')
const [date,setDate] = useState('')
const [quantidade,setQuantidade] = useState('')
const [valor,setValor] = useState('')



    async function handleCadastrar(e){
    e.preventDefault();
    if(categoria && codigo && nomeProduto && detalhes && date){
       await addDoc(collection(db,categoria),{
        codigo: codigo,
        nomeProduto: nomeProduto,
        detalhes: detalhes,
        date: new Date(date),
        quantidade: quantidade,
        valor: valor,
        valorEstoque:(quantidade * valor).toFixed(2) 

       })
       .then(()=>{
       toast.success("Produto cadastrado!",{
        position :"top-center",
        autoClose: 5000,
        theme:'dark'

       })
       setcategoria('');
       setCodigo('');
       setNomeProduto('');
       setDetalhes('');
       setDate('');
       setQuantidade('');
       setValor('')
       })
       .catch((error)=>{
        console.error("Erro ao cadastrar", error)
       })
    }else{
        toast.warn("Preencha os campos vazios!",{
            position: "top-center",
            autoClose: 5000,
            theme: 'dark'
        })
    }
    }
    
    return(
        <div className="formCadastro">
            <form onSubmit={handleCadastrar}>
            <h2>Cadastro Produtos</h2>
             <select className="input-select" value={categoria} onChange={(e)=> setcategoria(e.target.value)}>
                <option value="">Tipo Produto</option>
                <option value="eletronico">Eletronico</option>
                <option value="moveis">Móveis</option>
                <option value="roupas">Roupas</option>
                <option value="mercadorias">Mercadorias</option>
             </select>
             <div>
             <input
             type="text"
             value={codigo}
             onChange={(e)=>setCodigo(e.target.value)}
             maxLength="13"
             placeholder="Código Produto"
             />
             <input
             type="text"
             value={nomeProduto}
             onChange={(e)=>setNomeProduto(e.target.value)}
             placeholder="Nome Produto"
             />
             </div>
             <div>
             <input
             className="input-date"
             type="date"
             value={date}
             onChange={(e)=>setDate(e.target.value)}
             />
             <input
             className="input-valor"
             type="number"
             min='0'
             step='0.01'
             value={valor}
             onChange={(e)=>setValor(e.target.value)}
             placeholder="Valor(R$)"
             />
             <input
             className="input-qntd"
             type="number"
             value={quantidade}
             onChange={(e)=>setQuantidade(e.target.value)}
             placeholder="Qntd"
             />  
             </div>
             <textarea
             className="input-textArea"
             type="text"
             value={detalhes}
             onChange={(e)=>setDetalhes(e.target.value)}
             placeholder="Detalhes Produto"
             />
            <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}