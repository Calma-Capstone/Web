import React,{useState} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import LoginForm from '../../components/LoginForm/LoginForm';
import TailRegForm from '../../components/RegisterForm/TailRegForm';
import { Divider } from '@mui/material';
import Hero from '../../components/Hero/Hero';

const LandingPage = () => {
    const [Login,setLogin] = useState(false);
    const [Register, setRegister] = useState(false);

    const toggleRegister = () => {
      setLogin(false);
      setRegister(!Register);
    }
    const toggleLogin = () => {
        setRegister(false);
        setLogin(!Login);
      }
      
    return (
        <div>
            <Navbar isLogin ={toggleLogin} isRegister={toggleRegister}/>
            <Hero isRegister={toggleRegister}/>
            <LoginForm isRegister={toggleRegister} isOpen={Login} onClose={toggleLogin} />
            <TailRegForm isLogin={toggleLogin} isOpen={Register} onClose={toggleRegister} />
            
        </div>
    );
};

export default LandingPage;