
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import YorumGoster from './YorumGoster';
import { db, yorumlar } from "../firebase";
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot} from 'firebase/firestore';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
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

const itemsPerPage=1;

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
        <AccordionDetails>
          <Typography>
          {task.name}
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


    </div> );
}

export default KonuGoster;