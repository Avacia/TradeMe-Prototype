import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Reorder } from 'framer-motion'
import style from './CompareList.module.css'

export default function CompareList(){
    const location = useLocation()
    const compareList = location.state?.compareList || []
    const [draggableItem, setDraggableItem] = useState(compareList)

    return(
        <div className={style.compareContainer}>
            {compareList.length > 0 ? (
                <Reorder.Group 
                    axis="y"
                    values={draggableItem} 
                    onReorder={setDraggableItem}
                    className={style.compareColumn}
                >
                    {draggableItem.map((item) => (
                        <Reorder.Item 
                            value={item} 
                            key={item._id}
                            className={style.itemCard}
                        >
                            <NavLink to={`/ItemPage/${item._id}`}>
                                <h3>{item.name}</h3>
                            </NavLink>
                            <p>Price: ${item.price}</p>
                            <p>Category: {item.type}</p>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            ) : (
                <p className={style.compareNothing}>No items to compare</p>
            )}
        </div>
    )
}