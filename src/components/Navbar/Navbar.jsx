import React, {useState} from 'react';
import { Link} from 'react-scroll'
import {useNavigate} from "react-router-dom"
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import "./Navbar.css"
import calmaIcon from "../../assets/calma-transparrent.png"

const Navbar = ({isLogin,isRegister}) => {
    const [nav, setNav] = useState(false)
   
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)
 
  return (
    <div className='w-screen h-[80px] z-10 bg-transparent fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <span style={{alignItems:"center"}}class="flex  p-4 self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
          <h1 className='flex text-3xl font-bold mr-4 sm:text-4xl'style={{marginLeft:'50px'}}>Calma</h1>
          <img
                src={calmaIcon}
                class="flex h-10 mr-3 sm:h-14"
                alt="Calma Logo"
              />
          </span>
          <ul className='hidden cursor-pointer md:flex'>
       
          </ul>
        </div>
        <div className='hidden md:flex pr-4' style={{marginRight:'30px',gap:'15px'}}>
          <button onClick={isLogin}   className='border-none bg-transparent text-black mr-4 si-btn'>
            Sign In
          </button>
          <button onClick={isRegister}   className=' px-8 py-3 su-btn' >Sign Up</button>
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
          
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-white cursor-pointer w-full px-8'}>

        <div className='flex flex-col my-4'>
            <button onClick={isLogin} id="sign-in-toggle"  className='bg-transparent text-indigo-600 px-8 py-3 mb-4' >Sign In</button>
            <button  onClick={isRegister} color='#a390f5' className='px-8 py-3 su-btn'>Sign Up</button>
        </div>
      </ul>
      
    </div>
  );
};

export default Navbar;