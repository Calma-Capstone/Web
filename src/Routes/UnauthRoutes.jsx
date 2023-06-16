import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "../page/Landing/LandingPage";

const UnauthRoutes = () => (
    
    <Routes>
        <Route path="/" element={
            <LandingPage/>
        } />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>

);

export default UnauthRoutes