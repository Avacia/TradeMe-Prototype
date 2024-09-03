import style from './cardMapping.module.css'


export default function CardMapping({arrayName, needBtn, handleClick, handleOnDrag}){
    console.log("cardMapping.jsx: ", arrayName)
    return(
        <div className={style.bidContainer}>  
            {
                arrayName.map((item, index) =>(
                    <div className={style.CardInfo} key={index} draggable onDragStart={(e) => handleOnDrag(e, item)}>
                        <img className={style.CardImage} src={item.image[0]} alt={item.name}/>
                        <p>{item.name}</p>
                        <div className={style.Price}>
                            <p>Current Price: ${item.price}</p>
                            {needBtn && 
                                <button className={style.bidBtn} 
                                    onClick={() => handleClick(item)}>
                                        Place Your Bid
                                </button>
                            }
                        </div>
                    </div>
                ))
            } 
        </div>
        
    )
}