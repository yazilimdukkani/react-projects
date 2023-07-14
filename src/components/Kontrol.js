
import {useState,useEffect} from 'react';

import Kullanici from './Kullanici';
import Tablo from './Tablo';

function Kontrol({currentItems}) {
 
 


//console.log(veriler[0]);

 
        
      
          
      
     
    return ( 
    
    <div>
{currentItems.map((task,index)=>{

return <Tablo task={task} key={index}/>

})
}
    </div>  );
}

export default Kontrol;