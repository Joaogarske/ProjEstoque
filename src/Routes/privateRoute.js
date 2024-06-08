import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

const PrivateRouter = () => {
    const {currentUser} = useAuth();

    return currentUser ? <Outlet/> : <Navigate to="/"/>
 
}

export default PrivateRouter