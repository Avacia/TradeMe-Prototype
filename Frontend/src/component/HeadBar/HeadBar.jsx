import style from './HeadBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCartShopping, faHeart, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


export default function HeadBar(){
    return(
        <div className={style.headBarContainer}>
            <div className={style.leftSection}>
                <NavLink to="/">
                    <img src="/trademeLogo.png" alt="Trade me logo" style={{width:"12vw", height:"8vh", backgroundColor:"transparent"}}/>
                </NavLink>
                <p>Browse <FontAwesomeIcon icon={faCaretDown} /></p>
            </div>
            <div className={style.rightSection}>
                <p><FontAwesomeIcon icon={faCartShopping} />Watch list</p>
                <p><FontAwesomeIcon icon={faHeart} />Favourites</p>
                <p><FontAwesomeIcon icon={faPen} />Start a listing</p>
                <p><FontAwesomeIcon icon={faUser} />My Trade Me</p>
            </div>
        </div>
    )
}