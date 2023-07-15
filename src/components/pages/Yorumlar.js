

function Yorumlar({currentItems}) {
    
    
    return ( <div>
         {currentItems.map((task,index)=>{

<div key={index}>{task.yazi}</div>


         })}
    </div> );
}

export default Yorumlar;