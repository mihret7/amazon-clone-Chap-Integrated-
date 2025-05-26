// import React from 'react'
import React from 'react'

// import menu icon from react-icons
import { AiOutlineMenu } from "react-icons/ai";

// import css
import styles from './Header.module.css'


function LowerHeader() {
  return (
    <div className={styles.lower__container}>
     

        <ul>
            <li>
            <AiOutlineMenu />
                <p>All</p>
            </li>
            <li>Today's Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader