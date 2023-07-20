
import { useAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Menu from './Menu';
import Footer from './Footer';
import Table from 'react-bootstrap/Table';
import { db } from '../firebase';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import {getFirestore,collection,onSnapshot,deleteDoc,doc,addDoc,updateDoc,setDoc,query,where,documentId} from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
function YorumSil() {
    
    const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor

   const[veri,Setveriler]=useState([]);

const url=window.location.pathname;

   const al=url.substr(10);

const colRef = collection(db, "yorumlar");
const yorumlar = query(colRef, where('no', 'in', [al]));
useEffect(()=>{


return onSnapshot(yorumlar,(snapshot)=>{


Setveriler(snapshot.docs.map(doc=>({id:doc.id,no:doc.no, ...doc.data()})));

console.log(al);


})



},[]);


const [itemOffset, setItemOffset] = useState(0);

const itemsPerPage=18;

const endOffset = itemOffset + itemsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = veri.slice(itemOffset, endOffset);
const pageCount = Math.ceil(veri.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % veri.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};


const[id,Setid]=useState([]);
const Sil=(e)=>{

const silindi=deleteDoc(doc(db,"yorumlar",e));

if (silindi) {
    
alert("işlem tamam silindi");

}
else{


alert("Hataaa silinmedi");

}

}

    return ( <div>

{isLoading?<div>Bekle</div>:isAuthenticated?

<div>
    <Menu/>
{[
       
        'Danger',
      
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '100%' }}
          className="mb-2"
        >
          <Card.Header>Yorumlar</Card.Header>
          <Card.Body>
            <Card.Title>Yorum </Card.Title>
            <Card.Text>
         
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Kullanıcı adı</th>
          <th>Yazı</th>
          <th>Sil</th>
   
        </tr>
      </thead>
      <tbody>

        {currentItems.map((task,index)=>{

       return  <tr key={index}>
          <td>{task.name}</td>
          <td>{task.yazi}</td>
          <td><Button variant='danger' onClick={(e)=>{Sil(task.id)}} value={id}>Sil</Button></td>

        </tr>
})}
      </tbody>
    </Table>





            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      
<ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='react-paginate'
      />
      <Footer/>
</div>:<div>Giriş yok</div>
}
    </div> );
}

export default YorumSil;