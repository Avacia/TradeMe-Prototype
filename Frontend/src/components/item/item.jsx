import { useQuery } from 'react-query'
import Card from '../card/card'



export default function item(){
   const { data, status } = useQuery("item", getItem)

   async function getItem(){
        const res = await fetch('http://localhost:4000/getItems')
        return res.json()
   }

    if(status === 'loading'){
        return(<p>Loading...</p>)
    }

    if(status === 'error'){
        return(<p>Error !!</p>)
    }

    return(
        <div>
            <Card item={data}/>      
        </div>
    )
}