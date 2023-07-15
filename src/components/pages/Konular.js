
import Navbar from '../Navbar';
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot} from 'firebase/firestore';
import { db } from '../firebase';
import { useState ,useEffect} from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Bos from './Bos';

function Konular() {
const [veriler,Setveriler]=useState([]);

//const q = query(collection(db, "products"), where("id", "==", "lqiCphCPr5caWAbYqlL4"));
 
//const querySnapshot = getDocs(q);
  

const url=window.location.pathname;
const al=url.substr(9);

const colRef = collection(db, "products");
const q = query(colRef, where(documentId(), 'in', [al]));

useEffect(()=>{
return onSnapshot(q,(snapshot)=>{

  Setveriler(snapshot.docs.map(doc => doc.data()));
  

  
  
  });
  
},[]);

        // Set the "capital" field of the city 'DC'
    
    
       

   return ( <div>
<Navbar/>
<Bos veriler={veriler}/>



<div><div className='alt'>Burası footer</div></div>
    </div> );
}

export default Konular;