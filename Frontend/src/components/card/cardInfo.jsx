import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import style from './cardInfo.module.css'

export default function cardInfo({arrayName, item, index, needBtn, handleClick, handleOnDrag, needDelete, handleDelete}){
    return(
        <div className="cardInfoContainer">
            {handleOnDrag && 
                <div className={style.CardInfo} 
                     key={index} 
                     draggable={!!handleOnDrag} 
                     onDragStart={handleOnDrag ? (e) => handleOnDrag(e, item) : null}
                >   {console.log("CardInfo: ", item)}
                    <img className={style.CardImage} src={item.image} alt={item.name}/>
                    <p>{item.name}</p>
                    <div className={style.Price}>
                        <p>Current Price: ${item.price}</p>
                        {needBtn && 
                            <button className={style.bidBtn} 
                                onClick={() => handleClick(item)}>
                                    Place Your Bid
                            </button>
                        }
                        {needDelete &&
                            <button className={style.deleteBtn}
                                onClick={() => handleDelete(arrayName, item)}>
                                <FontAwesomeIcon className={style.icon} icon={faTrash} size="xl" />
                            </button>    
                        }
                </div>
            </div>}
        </div>
    )
}