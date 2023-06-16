import React from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder';
import NotFound from '../page/NotFound/NotFound';

function AuthRoutes() {

    return (
        <Routes>
            <Route path="/" element={
                <Sidebar>
                    <AudioRecorder />
                </Sidebar>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AuthRoutes