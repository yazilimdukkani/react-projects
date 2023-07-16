
import { db, yorumlar } from "../firebase";
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot} from 'firebase/firestore';
import { useState ,useEffect} from 'react';
import Yorumlar from "./Yorumlar";

import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import Input from '@mui/base/Input';
import { Button } from '@mui/material';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import { Icon } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
function YorumGoster({currentItems}) {

    
   //console.log(currentItems);


   return ( <div>
            {currentItems.map((task=>{
return <div>
<PeopleAltSharpIcon></PeopleAltSharpIcon>{"   "}{task.name}<br></br>
<QuestionAnswerIcon/>{task.yazi}

<hr></hr>
</div>


            }))}
    </div> );
}

export default YorumGoster;