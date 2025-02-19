import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import style from './ItemPage.module.css'
import { toast } from 'react-hot-toast'

export default function dataPage(){
    const {data, isLoading, error } = useQuery("data", getData)
    const { id } = useParams()
    const user = "Admin"
    const [currentPrice, setCurrentPrice] = useState(0)
    const [initialPrice, setInitialPrice] = useState(0)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        if(data) {
            setInitialPrice(data.price)
            setCurrentPrice(data.price)
        }
    }, [data])

    function handleAddAmount(){
        setCurrentPrice(currentPrice + 1)
    }

    function handleMinusAmount(){
        if(currentPrice - 1 < initialPrice){
            setCurrentPrice(currentPrice)
        }
        else{
            setCurrentPrice(currentPrice - 1)
        }
    }

    function CustomToast({t, onConfirm, onCancel}){
        return(
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap:'3vh',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    minWidth: '250px',
                }}
            >
                <p>Are you sure you want to place the bid?</p>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
                        onClick={() => {
                            onConfirm()
                            toast.dismiss(t.id)
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
                        onClick={() => {
                            onCancel();
                            toast.dismiss(t.id); // Close the toast
                        }}
                        >
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    function handleClick(){
        toast.custom((t) => (
            <CustomToast
                t={t}
                onConfirm={() => {
                    handleSubmit()
                    toast.success("Bid is placed")
                }}
                onCancel={() => toast.error("Canceled")}
            />
        ))
    }

    function handleSubmit(){
        const key = "none"
        const reserveInfo = item.reserve_price
        const checkKey = Object.keys(reserveInfo)
        if(checkKey !== key && currentPrice === reserveInfo[checkKey]){
            toast.error("You need to increase your Bid price")
        }
        else{
            const placeBid = {user, currentPrice, id}
            fetch('http://localhost:4000/updateItemBid', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(placeBid)
            })
            .then(() => {
                console.log("Bid Updated")
                console.log(JSON.stringify(placeBid))
            })
        }
    }

    function handleClick(){
        setIsClicked(!isClicked)
    }

    async function getData(){
        const res = await fetch(`http://localhost:4000/getItemById/${id}`)
        if(!res.ok){
            throw new Error("Network response was not ok")
        }
        return res.json()
    }

    useEffect(() => {
        setCurrentPrice(data.price)
    }, [data])

    
    if(isLoading){
        return(<p>Loading ...</p>)
    }

    if(error){
        return(<p>Error!!</p>)
    }
    console.log(data)
    return(
        <div className={style.CardInfo}>
            <h1>{data.name}</h1>
            <p>{data._id}</p>
            <p>Price: {data.price}</p>
            <p>Type: {data.type}</p>
            
            <div className={style.info}>
                <h5>Description:</h5>
                <button onClick={handleClick}>Show More</button>
                <p className={ isClicked ? style.open : style.close}>{data.description}</p>
            </div>
            
            <div className={style.btnContainer}>
                <button onClick={() => handleMinusAmount(data.initial_price)}>-</button>
                {currentPrice}
                <button onClick={() => handleAddAmount()}>+</button>
                <button onClick={() => handleClick()}> Place Bid</button>
            </div>
        </div>
    )
}