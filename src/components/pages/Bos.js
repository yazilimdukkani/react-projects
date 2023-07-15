import Konular from "./Konular";

function Bos({veriler}) {



    return ( <div>
        

        {veriler.map((task,index)=>{

return <div key={index}>{task.name}</div>

})

}

    </div> );
}

export default Bos;