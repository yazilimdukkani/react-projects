
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import YorumGoster from './YorumGoster';
import { db, Yorumveri,productsRef } from "../firebase";
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot,addDoc} from 'firebase/firestore';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';

import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Yorumlar from './Yorumlar';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import CreateIcon from '@mui/icons-material/Create';
function KonuGoster({veriler}) {


  const[yorumveri,Setyorum]=useState([]);//veritabanındaki konuların verilerini ceker baham

  const[veri,Setveri]=useState([]);//veritabanındaki konuların verilerini ceker baham

  const url=window.location.pathname;
  const al=url.substr(9);
  

const colRef = collection(db, "yorumlar");
const yorumlar = query(colRef, where('no', 'in', [al]));
  useEffect(()=>{


  return onSnapshot(yorumlar,(snapshot)=>{

      Setyorum(snapshot.docs.map(doc => doc.data()));
  
  
  
  });
  
},[]);

const [itemOffset, setItemOffset] = useState(0);

const itemsPerPage=18;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = yorumveri.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(yorumveri.length / itemsPerPage);
  
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % yorumveri.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
      

//yorum



const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor




    return ( <div>
        <div>
      

      <Accordion>
        <AccordionSummary
       
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Konu</Typography>
        </AccordionSummary>
        {veriler.map((task,index)=>{

return <div key={index}>
  <PeopleAltSharpIcon></PeopleAltSharpIcon>{task.user}
  <hr></hr>
        <AccordionDetails>
          <Typography>
          <CreateIcon></CreateIcon>{task.description}
          </Typography>
        </AccordionDetails>

        </div> })

}
      </Accordion>
      <Accordion>
        <AccordionSummary
  
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography>Yorumlar</Typography>
      

        </AccordionSummary>
        
      
<AccordionDetails>
          <Typography>

          <YorumGoster currentItems={currentItems}/>
          <hr></hr>
          </Typography>
        </AccordionDetails>



      
    


      </Accordion>
   
     
      </div>
     
      <ReactPaginate className='paginate'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
         />
{isLoading?<div>  <Box  sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Box></div>  :   isAuthenticated?<div><Yorumlar user={user.name} /></div>:<div></div>}
    </div> );
}

export default KonuGoster;