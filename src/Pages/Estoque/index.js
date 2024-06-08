import React from "react";
import './estoque.css'
import './modalEditar.css'
import { useState,useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    query,
    where
    } from 'firebase/firestore'
    import { toast } from "react-toastify";
import Modal from 'react-modal' 

Modal.setAppElement('#root')
export default function NavegacaoEstoque(){
 
    const [estoque,setEstoque] = useState([]);
    const [categoria,setCategoria] = useState('eletronico');
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const [prodId,setProdId] = useState('')

   
   const [nomeProduto, setNomeProduto] = useState('')
   const [detalhes, setDetalhes] = useState('')
   const [quantidade,setQuantidade] = useState('')
   const [valor,setValor] = useState('')
    
    //useState para buscar produto
    const [searchCode, setSearchCode] = useState('')
    const [serchResults,setSearchResults] =useState([])

 

    //useEffect para renderizar os produtos em estoque de acordo com seu tipo
    useEffect(()=>{
    async function loadEstoque(){
          
            const estoqueRef = collection(db, categoria);
            await getDocs(estoqueRef)
            .then((snapshot)=>{
                let list = [];

                snapshot.forEach((doc)=>{
                    list.push({
                     id: doc.id,
                     codigo: doc.data().codigo,
                     detalhes: doc.data().detalhes,
                     nomeProduto: doc.data().nomeProduto,
                     quantidade: doc.data().quantidade,
                     valor: doc.data().valor,
                     valorEstoque: doc.data().valorEstoque
                    })

                })
                setEstoque(list)
            })
            .then((error)=>{
                console.log("erro ao buscar", error)
            })
            
          }
      
          loadEstoque();
        }, [categoria]);

    //function para abrir o modal
        function handleModal(item){
            setDetalhes(item.detalhes)
            setNomeProduto(item.nomeProduto)
            setValor(item.valor)
            setQuantidade(item.quantidade)
            setProdId(item.id)
            setModalIsOpen(true);
          };
        
        function  closeModal(){
            setDetalhes('')
            setNomeProduto('')
            setValor('')
            setQuantidade('')
            setProdId('')
            setSearchResults([])
            setModalIsOpen(false);
          };
    //function para deletar produtos
    async function handleDeletar(e){
        e.preventDefault()
       const docRef = doc(db,categoria,prodId)
       await deleteDoc(docRef).then(()=>{
        toast.success("Produto deletado com sucesso!")
        setDetalhes('')
        setNomeProduto('')
        setValor('')
        setQuantidade('')
        setProdId('')
       }).catch((error)=>{
         console.log("erro ao deletar", error)
       }) 
    }
    // function atualizar produtos
    async function handleUpdate(e){
        e.preventDefault();
        const docRef = doc(db,categoria,prodId)
        await updateDoc(docRef,{
            nomeProduto: nomeProduto,
            quantidade: quantidade,
            valor:valor,
            detalhes: detalhes
        }).then(()=>{
            toast.success("Produto atualizado!")
            setDetalhes('')
            setNomeProduto('')
            setValor('')
            setQuantidade('')
            setProdId('')
            setModalIsOpen(false)
        }).catch((error)=>{
            console.log("erro ao atualizar", error)
            setDetalhes('')
            setNomeProduto('')
            setValor('')
            setQuantidade('')
            setProdId('')
        })
    }

    //function buscar de produtos 
   async function handleBuscar(e){
        e.preventDefault()
        const collections = ['eletronico','moveis','roupas','mercadorias']
        let results = []


    if(searchCode){
       for(const collectionName of collections){
        const q = query(collection(db,collectionName), where("codigo","==",searchCode))
        await getDocs(q).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                results.push({id: doc.id, ...doc.data(), collection: collectionName})
            })          
        }).catch((error)=>{
           console.log("erro ao buscar:", error)
        }) 
      }

      setSearchResults(results)
     if(serchResults.length === 1){
        {serchResults.map((product)=>{
            setNomeProduto(product.nomeProduto)
            setDetalhes(product.detalhes)
            setQuantidade(product.quantidade)
            setValor(product.valor)
            setProdId(product.prodId)
          })}
          setModalIsOpen(true)
     }
    }else{
        toast.warn("Digite o código do produto!")
      }
      
    }





    return(
        <div>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulário Modal"
        shouldCloseOnOverlayClick={false}
        style={{overlay:{
            backgroundColor: 'rgb(0,0,0,0.75)'
        },
        content:{
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
             backgroundColor:  'rgb(28, 139, 190)',
             width: '600px',
             height:'450px',
             borderStyle:'none',
             borderRadius:'30px'

        }
    }}
        >

       <div className="formModal">
        <h2>Formulário</h2>
        <form >
        <div>
             <input
             type="text"
             value={nomeProduto}
             onChange={(e)=>setNomeProduto(e.target.value)}
             placeholder="Nome Produto"
             />
             </div>
             <div>
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
             onChange={(e)=>{setQuantidade(e.target.value)}}
             placeholder="Qntd"
             />  
             </div>
             <textarea
             className="input-textArea"
             type="text"
             value={detalhes}
             onChange={(e)=>{setDetalhes(e.target.value)}}
             placeholder="Detalhes Produto"
             />
             <div className="btn-container">
             <button onClick={handleUpdate}>Atualizar</button>
            <button onClick={handleDeletar}>Deletar</button>
            <button className="btn-closeModal" onClick={closeModal}>Fechar</button>
             </div>
            </form>
        </div>
        </Modal>
        
        <nav className="nav-bar-estoque">
        <select className="btn-select" value={categoria} onChange={(e)=>setCategoria(e.target.value)} >
                <option value="eletronico">Eletronico</option>
                <option value="moveis">Móveis</option>
                <option value="roupas">Roupas</option>
                <option value="mercadorias">Mercadorias</option>
             </select>

        <form onSubmit={handleBuscar}>
          <input
          className="input-busca"
          placeholder="Codigo do produto"
          value={searchCode}
          onChange={(e)=>setSearchCode(e.target.value)}
          maxLength={14}
          /> 
          <button 
          className="btn-busca"
          type="submit"
          >Buscar</button> 
        </form>     
        </nav>
        <div className="titulo-estoque">
            <h3>Código</h3>
            <h3>Nome Produto</h3>
            <h3>Detalhes</h3>
            <h3>Qntd</h3>
            <h3>Valor</h3>
            <h3>Valor Total</h3>

        </div>
        <ul>
        {estoque.map((item)=>{
            return(
                <li key={item.id} className="list-estoque">
                    <p>{item.codigo}</p>
                    <p>{item.nomeProduto}</p>
                    <p>{item.detalhes}</p>
                    <p>{item.quantidade}</p>
                    <p>{item.valor}</p>
                    <p>{item.valorEstoque}</p>
                    <button
                     className="btn-editar"
                     onClick={()=>handleModal(item)}
                     >Editar</button>
                </li>
            )
          })}
        </ul>
       </div>
    )

}
