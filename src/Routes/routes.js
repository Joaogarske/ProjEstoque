import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/index.js";
import Home from "../Pages/Home/index.js";
//import PrivateRouter from "./privateRoute";
//import { AuthProvider } from "./authProvider";


export default function NavegateRoutes(){
    return(
 <Router>
        <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/home" element={<Home/>}/>
        </Routes>
</Router>
       
    )
}