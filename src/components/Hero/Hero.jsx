import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css"

function Hero({isRegister}) {
    return (
        <div id='calma-main'>
            
         <div className="calma-name">
            <h1>Calma</h1>
            <br/>
            <h2 className="details">
            Platform Curhat untuk mengatasi perasaanmu
            </h2>
            <Link onClick={isRegister}  className='cv-btn'>Coba Sekarang!</Link>
         </div>
        </div>
    );
    }

export default Hero;