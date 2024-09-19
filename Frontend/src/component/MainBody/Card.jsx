import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import style from "./Card.module.css"

export default function Card({item, id, user, compareListBackToMain}){
    const [currentPrice, setCurrentPrice] = useState(item.price)

    function handleAddAmount(){
        setCurrentPrice(currentPrice + 1)
    }

    function handleMinusAmount(initialPrice){
        const price = Math.max(currentPrice - 1, initialPrice)
        setCurrentPrice(price)
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
                toast.success("Bid is placed")
            })
        }
    }

    function handleCompare(){
        compareListBackToMain(item)
    }

    return(
        <div className={style.itemCard}>
            <NavLink to={`/ItemPage/${item._id}`}>
                <p>Item Info: {item.name}</p>
            </NavLink>
            <p>Item Id: {item._id}</p>
            <p>Item Price: {item.price}</p>
            <p>Item Type: {item.type}</p>
            <div className={style.btnContainer}>
                <button onClick={() => handleMinusAmount(item.price)}>-</button>
                {currentPrice}
                <button onClick={() => handleAddAmount()}>+</button>
                <button onClick={() => handleClick()}> Place Bid</button>
                <button onClick={handleCompare}>Compare</button>
            </div>
        </div>
    )
}