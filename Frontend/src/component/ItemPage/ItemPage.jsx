import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import style from './ItemPage.module.css'
import { toast, Toaster } from 'react-hot-toast'

export default function ItemPage(){
    const {data, isLoading, error } = useQuery("data", getData)
    const { id } = useParams()
    const navigate = useNavigate()
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

    function toggleDescription(){
        setIsClicked(!isClicked)
    }

    function CustomToast({t, onConfirm, onCancel}){
        return(
            <div className={style.toastContainer}>
                <p>Are you sure you want to place the bid?</p>
                <div className={style.toastButtons}>
                    <button
                        className={style.confirmBtn}
                        onClick={() => {
                            onConfirm()
                            toast.dismiss(t.id)
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className={style.cancelBtn}
                        onClick={() => {
                            onCancel()
                            toast.dismiss(t.id)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    function placeBid(){
        if (currentPrice <= data.price) {
            toast.error("Bid must be higher than current price!")
            return
        }

        toast.custom((t) => (
            <CustomToast
                t={t}
                onConfirm={() => {
                    handleSubmit()
                    toast.success("Bid placed successfully!")
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                }}
                onCancel={() => toast.error("Bid cancelled")}
            />
        ))
    }

    function handleMinusAmount(){
        if(currentPrice - 1 <= data.price){
            toast.error("Bid amount cannot be lower than current price")
            return
        }
        setCurrentPrice(currentPrice - 1)
    }

    function handleSubmit(){
        const placeBid = {user, currentPrice, id}
        fetch('http://localhost:4000/updateItemBid', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(placeBid)
        })
    }

    async function getData(){
        const res = await fetch(`http://localhost:4000/getItemById/${id}`)
        if(!res.ok){
            throw new Error("Network response was not ok")
        }
        return res.json()
    }

    if(isLoading) return <div className={style.loading}>Loading...</div>
    if(error) return <div className={style.error}>Error loading item</div>

    return(
        <div className={style.container}>
            <Toaster position="top-center" />
            <div className={style.itemCard}>
                <div className={style.header}>
                    <h1>{data.name}</h1>
                    <span className={style.itemId}>#{data._id}</span>
                </div>

                <div className={style.mainInfo}>
                    <div className={style.priceSection}>
                        <h2>Current Price: ${data.price}</h2>
                        <p className={style.type}>Category: {data.type}</p>
                    </div>

                    <div className={style.description}>
                        <h3>Description</h3>
                        <button onClick={toggleDescription} className={style.toggleBtn}>
                            {isClicked ? 'Show Less' : 'Show More'}
                        </button>
                        <p className={isClicked ? style.open : style.close}>
                            {data.description}
                        </p>
                    </div>
                </div>

                <div className={style.bidSection}>
                    <div className={style.bidControls}>
                        <button onClick={handleMinusAmount}>-</button>
                        <span className={style.bidAmount}>${currentPrice}</span>
                        <button onClick={handleAddAmount}>+</button>
                    </div>
                    <button className={style.placeBidBtn} onClick={placeBid}>
                        Place Bid
                    </button>
                </div>
            </div>
        </div>
    )
}