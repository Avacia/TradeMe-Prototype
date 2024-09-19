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
            {
                compareList.length > 0 ? (
                    <Reorder.Group values={draggableItem} onReorder={setDraggableItem}>
                        {
                            draggableItem.map((item) => {
                                return(
                                    <Reorder.Item value={item} key={item._id}>
                                        <div className={style.itemCard}>
                                            <NavLink to={`/ItemPage/${item._id}`}>
                                                <p>Item Info: {item.name}</p>
                                            </NavLink>
                                            <div>
                                                <p>Item Id: {item._id}</p>
                                                <p>Item Price: {item.price}</p>
                                                <p>Item Type: {item.type}</p>
                                            </div>
                                        </div>
                                    </Reorder.Item>
                                )
                            })
                        }
                    </Reorder.Group>
                ) : (
                    <p className={style.compareNothing}>No items to compare</p>
                )
            }
        </div>
    )
}