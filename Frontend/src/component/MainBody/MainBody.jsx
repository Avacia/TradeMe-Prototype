import { useQuery } from 'react-query'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import style from './MainBody.module.css'
import Card from './Card'

export default function MainBody() {
    // Initialize all state hooks at the top
    const [filter, setFilter] = useState([])
    const [bidList, setBidList] = useState([])
    const [selectType, setSelectType] = useState('')
    const [compareList, setCompareList] = useState([])
    
    const user = "Admin"
    const navigate = useNavigate()

    const { data, isLoading, error } = useQuery("Item", () => 
        fetch('http://localhost:4000/getItem')
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok")
                return res.json()
            })
    )

    // Memoize handlers with useCallback
    const handleCompareList = useCallback((item) => {
        if (compareList.includes(item)) {
            toast.error("It is already in the compare list")
            return
        }
        setCompareList(prev => [...prev, item])
        toast.success("Item is ready to compare")
    }, [compareList])

    const goToComparePage = useCallback(() => {
        navigate('/compareItem', { state: { compareList } })
    }, [navigate, compareList])

    // Data processing effects
    useEffect(() => {
        if (data) {
            const uniqueTypes = [...new Set(data.map(item => item.type))]
            setFilter(uniqueTypes)
            setBidList(data)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            const filteredData = selectType 
                ? data.filter(item => item.type === selectType)
                : data
            setBidList(filteredData)
        }
    }, [selectType, data])

    if (isLoading) return <div className={style.loading}>Loading ...</div>
    if (error) return <div className={style.error}>Error: {error.message}</div>

    return (
        <div className={style.mainContainer}>
            <div className={style.filterSection}>
                <select 
                    onChange={(e) => setSelectType(e.target.value)} 
                    value={selectType}
                    className={style.filterSelect}
                >
                    <option value="">All Types</option>
                    {filter.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                
                <button 
                    onClick={goToComparePage}
                    className={style.compareButton}
                    disabled={compareList.length === 0}
                >
                    Compare Items ({compareList.length})
                </button>
            </div>
            
            <div className={style.itemContainer}>
                {bidList.map((item) => (
                    <Card 
                        key={item._id}
                        item={item} 
                        id={item._id} 
                        user={user} 
                        compareListBackToMain={handleCompareList}
                    />
                ))}
            </div>
        </div>
    )
}