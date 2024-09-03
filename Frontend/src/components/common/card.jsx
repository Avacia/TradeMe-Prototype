import style from './card.module.css'
import CardMapping from './cardMapping.jsx'
import Swal from 'sweetalert2'
import { useState } from 'react'

export default function card(item){
    const [placedBid, setPlacedBid] = useState([])
    const [dragContent, setDragContent] = useState(null)
    const [draggedItem, setDraggedItem] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false)

    function handleClick(item){
        Swal.fire({
            title: `Are you sure you want to place a bid?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Place the bid!"
          }).then((result) => {
            if (result.isConfirmed) {
                if(!checkIsInContainItem(placedBid, item)){
                    setPlacedBid(prevBids => [...prevBids, item])
                    Swal.fire({
                        title: "Success",
                        text: "Your have placed your bid.",
                        icon: "success"
                    });
                }
                else{
                    Swal.fire({
                        title: "Failed",
                        text: "The bid has already been placed",
                        icon: "error"
                    });
                } 
            }
          });
    }

    function checkIsInContainItem(arrayName, item){
        return arrayName.includes(item)
    }

    function handleOnDrag(e, item){
        setDragContent(item)
        e.dataTransfer.effectAllowed="move"
    }

    function handleOnDrop(e){
        e.preventDefault()
        e.dataTransfer.dropEffect="move"
        if(!checkIsInContainItem(draggedItem, dragContent))
        setDraggedItem(prevDraggedItem => [...prevDraggedItem, dragContent])
    }

    function handDragOver(e){
        e.preventDefault()
    }

    function handleIsClick(){
        setIsClicked(!isClicked)
    }

    return(
        <div className={style.cardContainer}>
            
            {placedBid.length > 0 && <div className={style.bidContainer}>
                <h3>Your Placed Bid</h3>
                <CardMapping arrayName={placedBid} needBtn={false} handleClick={handleClick} handleOnDrag={null}/> 
            </div>}

            <div className={style.Card}>
                <CardMapping arrayName={item.item} needBtn={true} handleClick={handleClick} handleOnDrag={handleOnDrag}/>
            </div>

            <button onClick={handleIsClick}>Compare</button>
            {isClicked && <div className={style.droppedItem} onDrop={handleOnDrop} onDragOver={handDragOver}>
                <p>Compare Item</p>
                <CardMapping arrayName={draggedItem} needBtn={false} handleClick={handleClick} handleOnDrag={null}/>        
            </div>}
        </div>
    )
}