# ProjEstoque

<h1 align="center">
:construction:	 Em construção :construction:
</h1>

 ✏️ Sobre 
 
 Um sistema de controle de estoque desenvolvido em React, com as funcionalidades:
 Cadastrar
 Controle de estoque podendo atualizar, deletar e fazer busca pelo código do produto 
 
   

 🚀 Tecnologias Utilizadas
 
O projeto foi desenvolvido utilizando as seguintes tecnologias:
- React
- Firebase

Caso queira utilizar o sistema deve criar uma conta no firebase e modificar o seguinte documento
src/firebaseConfig.js que vai estar abaixo, e inicar authentication, o método de login deve ser email/senha, vc deve adicionar o usuário diretamente no banco de dados firebase.

quando criar seu banco de dados basta substituir esse trecho pela sua configuração do SDK:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
  };
 ```  
:hammer_and_wrench: Comandos para utilizar o sistema 

```
 npm start
```
```
npm run electron 

