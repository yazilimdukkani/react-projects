
import { db, yorumlar } from "../firebase";
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot} from 'firebase/firestore';
import { useState ,useEffect} from 'react';
import Yorumlar from "./Yorumlar";


function YorumGoster({currentItems}) {

    
   


   return ( <div>
          {currentItems.map((task,index)=>{

return <div key={index}>{task.name}</div>

})

}
    </div> );
}

export default YorumGoster;