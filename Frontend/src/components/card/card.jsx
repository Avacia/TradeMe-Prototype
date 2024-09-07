import style from './card.module.css'
import CardMapping from './cardMapping.jsx'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function card(item){
    const [placedBid, setPlacedBid] = useState([])    
    const [draggedItem, setDraggedItem] = useState([])
    const [dragContent, setDragContent] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [filteredTypeArray, setFilteredTypeArray] = useState([])
    const defaultArray = item.item
    const shouldDisplayArrow = true
    let typeArray = []


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
                    handleSubmit(item)
                    Swal.fire({
                        title: "Success",
                        text: "Your have placed your bid.",
                        icon: "success"
                    });
                }
                else{
                    Swal.fire({
                        title: "Error",
                        text: "This bid has already been placed.",
                        icon: "error",
                    })
                } 
            }
          });
    }

    function checkIsInContainItem(arrayName, item){
        return arrayName.some((arrayItem) => arrayItem._id === item._id)
    }

    function handleOnDrag(e, item){
        setDragContent(item)
        e.dataTransfer.effectAllowed="move"
    }

    function handleOnDrop(e){
        e.preventDefault()
        e.dataTransfer.dropEffect="move"
        if(!checkIsInContainItem(draggedItem, dragContent)){
            setDraggedItem(prevDraggedItem => [...prevDraggedItem, dragContent])
        }
        
    }

    function handDragOver(e){
        e.preventDefault()
    }

    function handleIsClick(){
        setIsClicked(!isClicked)
    }

    function handleDelete(arrayName, item){
        Swal.fire({
            title: `Are you sure you want to remove this bid?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove it!"
          }).then((result) => {
            if (result.isConfirmed) {
                if(arrayName === placedBid){
                    setPlacedBid(prevBids => prevBids.filter(bid => bid._id !== item._id))
                }
                else{
                    setDraggedItem(prevBids => prevBids.filter(bid => bid._id !== item._id))
                }
                Swal.fire({
                    title: "Success",
                    text: "Your have Successfully remove it.",
                    icon: "success"
                });
            }
          });
    }

    function clearAll(){
        setDraggedItem([])
    }

    function filterItem(){
        for(let item of defaultArray){
            const itemType = item.type
            if(typeArray.includes(itemType) === false){
                typeArray.push(itemType)
            }
        }
        setFilteredTypeArray(typeArray)
        console.log("filtered Type:", filteredTypeArray)
    }

    function handleSubmit(item){

        const postData = {
            "item": item
        }

        console.log("Data being sent: ", postData)

        axios.post("http://localhost:4000/updateItems", postData)
            .then((res) => {
                console.log(res.data, placedBid)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/getItems")
            .then((response) => {
                const items = response.data
                setPlacedBid(items.filter(item => item.bid_placed === true))
            })
            .catch(error => {
                console.error("Error fetching items: ", error)
            })
    }, [])

    return(
        <div className={style.cardContainer}>
            {placedBid.length > 0 && <div className={style.bidContainer}>
                <h3>Your Placed Bid</h3>
                <CardMapping 
                    arrayName={placedBid} 
                    needArrow={true}
                    needBtn={false} 
                    handleClick={handleClick} 
                    handleOnDrag={handleOnDrag} 
                    needDelete={false} 
                    handleDelete={null}/> 
            </div>}

            <div className={style.Card}>
                <CardMapping 
                    arrayName={defaultArray}
                    needArrow={shouldDisplayArrow}
                    needBtn={true} 
                    handleClick={handleClick} 
                    handleOnDrag={handleOnDrag} 
                    needDelete={false} 
                    handleDelete={null}/>
            </div>

            <div className={style.filter}>
                <select onChange={(e) => {const selected = defaultArray?.filter((searchType) => searchType.type === e.target.value)
                        setSelectedItem(selected)}}
                        onClick={filterItem}>
                    {console.log("On Change:", selectedItem)}
                    <option>Choose An Category</option>
                    {filteredTypeArray && 
                        filteredTypeArray.map((type, index) => {
                            return(
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            )
                        })
                    }
                </select>
                <div className={style.displayFilterItem}>
                    {selectedItem &&
                        <CardMapping 
                            arrayName={selectedItem}  
                            needArrow={false}
                            needBtn={true} 
                            handleClick={handleClick} 
                            handleOnDrag={handleOnDrag} 
                            needDelete={false} 
                            handleDelete={null}/>
                    }
                </div>
            </div>

            <button onClick={handleIsClick}>Compare</button>
            {isClicked && <div className={style.droppedItem} onDrop={handleOnDrop} onDragOver={handDragOver}>
                <div className={style.droppedItemInfo}>
                    <p>Compare Item</p>
                    <button className={style.droppedItemDeleteBtn} onClick={clearAll}>Clear all</button>
                </div>
                
                <div className={style.reorderContainer}>
                    <CardMapping 
                        arrayName={draggedItem} 
                        needArrow={false}
                        needBtn={true} 
                        handleClick={handleClick} 
                        handleOnDrag={handleOnDrag} 
                        needDelete={true} 
                        handleDelete={handleDelete}/>
                </div>     
            </div>}
        </div>
    )
}