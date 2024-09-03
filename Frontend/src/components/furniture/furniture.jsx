import { useQuery } from 'react-query'
import Card from '../common/card'


export default function furniture(){
   const { data, status} = useQuery("furniture", fetchFurniture)

   async function fetchFurniture(){
        const res = await fetch('http://localhost:4000/getFurniture')
        return res.json()
   }

    if(status === 'loading'){
        return(<p>Loading...</p>)
    }

    if(status === 'error'){
        return(<p>Error !!</p>)
    }

    return(
        <Card data={data}/>
    )
}