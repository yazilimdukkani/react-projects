
import { useAuth0 } from '@auth0/auth0-react';
import App from '../App';
import { useState } from 'react';

function Konuekle() {
    
 const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor

    return ( <div>


<App us={user.name}/>




    </div> );
}

export default Konuekle;