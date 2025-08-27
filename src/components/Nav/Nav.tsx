import React from 'react'
import styles from './Nav.module.scss'

const Nav = () => {
    return (
        <div className={styles.nav}>
            <h2>JIRA LIKE</h2>
            <ul>
                <li>Home</li>
                <li>Tableaux</li>
            </ul>
        </div>
    )
}

export default Nav
