

import { initializeApp } from "firebase/app";
import {useEffect,useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore,collection,onSnapshot,deleteDoc,doc,addDoc,updateDoc} from 'firebase/firestore';
import { ref } from "react";

//const[Depola,SetDepo]=useState([]);
const firebaseConfig = {
  apiKey: "AIzaSyDFgIXWazAkn69eRZ5F-yv8aJAk0JZ7uMg",
  authDomain: "strategic-team-367923.firebaseapp.com",
  projectId: "strategic-team-367923",
  storageBucket: "strategic-team-367923.appspot.com",
  messagingSenderId: "335347776186",
  appId: "1:335347776186:web:3d8dab3b70a1f204bd2083",
  measurementId: "G-DXXH1Q2WYH"
};

      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
    export const auth= getAuth(app);
    export const db = getFirestore(app);
    export const productsRef= collection(db, "products");

console.log(productsRef);
    

    export const deleteProduct=async(id)=>{

    deleteDoc(doc(db, "products",id));
  
  
  }


    
export const addProduct=()=>{


addDoc(productsRef,{
name:"iphone",
description:"yazılarımı yazdım",
price:"345Tl",


});

}
export const updateForm=(id)=>{

  const washingtonRef = doc(db, "products",id);

  // Set the "capital" field of the city 'DC'
   updateDoc(washingtonRef, {
    name: "bacaklar çok sexi"
  });
}
    