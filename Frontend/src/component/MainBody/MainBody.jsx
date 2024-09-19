import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import style from './MainBody.module.css'
import Card from './Card'

export default function MainBody(){
    const user = "Admin"
    const {data, isLoading, error} = useQuery("Item", getItemFromDB)
    const navigate = useNavigate()
    const [filter, setFilter] = useState([])
    const [bidList, setBidList] = useState([])
    const [selectType, setSelectType] = useState('')
    const [compareList, setCompareList] = useState([])
    
    async function getItemFromDB(){
        const res = await fetch('http://localhost:4000/getItem')

        if(!res.ok){
            throw new Error("Network response was not ok")
        }

        return res.json()
    }

    if(isLoading){
        return (<p>Loading ...</p>)
    }

    if(error){
        return(<p>Error!!!</p>)
    }

    useEffect(() => {
        if(data){
            const uniqueTypes = [...new Set(data.map(item => item.type))]
            setFilter(uniqueTypes)
            setBidList(data)
        }
    }, [data])

    useEffect(() => {
        if(selectType){
            const filteredData = data.filter(item => item.type === selectType)
            setBidList(filteredData)
        }
        else{
            setBidList(data)
        }
    }, [selectType, data])

    function handleCompareList(item){
        if(compareList.includes(item)){
            toast.error("It is already in the compare list")
        }
        else{
            setCompareList(prev => [... prev, item])
            toast.success("Item is ready to compare")
        }
    }

    function goToComparePage(){
        console.log("Main", compareList)
        navigate('/compareItem', {state: {compareList} })
    }
    return(
        <div className={style.mainContainer}>
            <select onChange={(e) => setSelectType(e.target.value)} value={selectType}>
                <option value="">All Types</option>
                {filter.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            
            <div>
                <button onClick={goToComparePage}>Compare Items</button>
            </div>
            
            <div className={style.itemContainer}>
                {
                    bidList.map((item, index) => {
                        const id = item._id
                        return(
                            <div key={index}>
                                <Card item={item} id={id} user={user} compareListBackToMain={handleCompareList}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}