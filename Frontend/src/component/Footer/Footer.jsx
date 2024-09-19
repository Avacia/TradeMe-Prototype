import style from "./Footer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer(){
    return(
        <div className={style.footerContainer}>
            <div className={style.topSection}>
                <img src="/trademeLogo.png" alt="Trade Me Logo" style={{width:"10vw", height:"7vh"}}/>

                <div className={style.topInfoContainer}>
                    <p>List an item</p>
                    <p style={{paddingRight:"1.8vw"}}>Watchlist</p>
                    <p style={{paddingRight:"2.2vw"}}>Favourites</p>
                    <p style={{paddingRight:"1.8vw"}}>My Trade Me</p>
                    <div className={style.login}>
                        <p>Register</p>
                        <p>Login</p>
                    </div>
                </div>                
            </div>

            <span className={style.divider}></span>

            <div className={style.bottomSection}>
                <div className={style.category}>
                    <h5 style={{color:"red", fontSize:"1.2rem"}}>Marketplace</h5>
                    <p>Latest deals</p>
                    <p>Stores</p>
                    <p>Closing soon</p>
                    <p>$1 reserve</p>
                </div>

                <div className={style.category}>
                    <h5 style={{color:"orange", fontSize:"1.2rem"}}>Jobs</h5>
                    <p>Browse categories</p>
                    <p>Career advice</p>
                    <p>JobSmart</p>
                    <p>Advertisers advice</p>
                </div>

                <div className={style.category}>
                    <h5 style={{color:"grey", fontSize:"1.2rem"}}>Motors</h5>
                    <p>Browse all cars</p>
                    <p>Other vehicles</p>
                    <p>Buying & Selling</p>
                    <p>Dealer news & info</p>
                </div>

                <div className={style.category}>
                    <h5 style={{color:"green", fontSize:"1.2rem"}}>Property</h5>
                    <p>International property</p>
                    <p>News & guides</p>
                    <p>Homes.co.nz</p>
                    <p>OneHub for agents</p>
                </div>

                <div className={style.category}>
                    <h5 style={{color:"black", fontSize:"1.2rem"}}>Services</h5>
                    <p>Trades</p>
                    <p>Domestic services</p>
                    <p>Events & entertainment</p>
                    <p>Health & wellbeing</p>
                </div>

                <div className={style.category}>
                    <h5 style={{color:"light-blue", fontSize:"1.2rem"}}>Community</h5>
                    <p>Help</p>
                    <p>Announcements</p>
                    <p>Trust & safety</p>
                    <p>Seller information</p>
                </div>
            </div>

            <div className={style.downSection}>
                <p>© 2024 Trade Me Limited</p>

                <div className={style.downSectionCenter}>
                    <p>Desktop site</p>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Advertise</p>
                    <p>Privacy policy</p>
                    <p>Terms & conditions</p>
                    <p>Contact Us</p>
                </div>

                <div className={style.downSectionRight}>
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faTwitter} />
                </div>
            </div>

        </div>
    )
}