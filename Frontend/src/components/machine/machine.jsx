import { useQuery } from 'react-query'
import Card from '../common/card'


export default function machine(){
   const { data, status } = useQuery("machine", getMachine)

   async function getMachine(){
        const res = await fetch('http://localhost:4000/getMachine')
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