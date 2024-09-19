import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import style from './PlacedItem.module.css'

export default function PlacedItem(){
    const user = "Admin"
    const [bidList, setBidList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemsPerPage = 3
    const {data, isLoading, error} = useQuery("PlacedBid", getPlacedBid)

    async function getPlacedBid(){
        const res = await fetch("http://localhost:4000/getItem")

        if(!res.ok){
            throw new Error("Network response is not ok")
        }

        return res.json()
    }

    if(isLoading){
        return(<p>Loading ...</p>)
    }

    if(error){
        return(<p>Error!! {error}</p>)
    }

    useEffect(() => {
        if(data){
            const placedList = data.filter((item) => user in item.reserve_price)
            setBidList(placedList)
            setCurrentIndex(0)
        }
    }, [data])

    function handleNext(){
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= bidList.length) ? 0 : prevIndex + itemsPerPage)
    }

    function handlePrev(){
        setCurrentIndex((prevIndex) => 
            (prevIndex === 0) ? Math.max(0, bidList.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage))
    }


    return(
        <div className={style.CardInfo}>
            <div className={style.container}>
                <h1>Your Placed Bid: </h1>
                {bidList.length > itemsPerPage && (
                    <div className={style.navigation}>
                        <button onClick={handlePrev} className={style.navBtn}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={handleNext} className={style.navBtn}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                )}
            </div>
            {
                bidList.slice(currentIndex, currentIndex + itemsPerPage).map((data, index) => (
                    <div className={style.card} key={index}>
                        <h1>{data.name}</h1>
                        <p>{data._id}</p>
                        <p>Price: {data.price}</p>
                        <p>Type: {data.type}</p>
                    </div>
                ))
            }
        </div>
    )
}