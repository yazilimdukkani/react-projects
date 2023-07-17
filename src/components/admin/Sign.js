import { Input } from "@mui/icons-material";

import {auth} from './Ayar';

import { signInWithEmailAndPassword,getAuth,signOut,firebase} from "firebase/auth";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Auth0Provider} from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
function Sign() {
    
const[email,Setemail]=useState('');
const[password,Setpassword]=useState('');
const[depola,Setdepola]=useState('');




const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor


 
 

    return ( 
    
    <div>

    
   


    
    <br></br>
    {isLoading?<div>Bekleyiniz</div>:isAuthenticated?
    <div><button onClick={logout}>Çıkış</button> Hoşgeldiniz burası admin paneli<br></br>{user.nickname}</div>
    :<div><button type="submit" onClick={loginWithRedirect}>Giriş</button></div>
}






    </div> );
}

export default Sign;