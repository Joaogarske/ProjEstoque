import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const authContext = createContext();

export const  useAuth = () =>{
    return useContext(authContext);
}

export const  AuthProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   
   useEffect(()=>{
    const unsub = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
    })

    return unsub;

   },[])

   return (
    <authContext.Provider value={{currentUser}}>
        {children}
    </authContext.Provider>
   )
}