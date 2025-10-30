import { NavLink } from 'react-router'
import styles from './Nav.module.css'

const Nav = () => {
    return (
        <div className={styles.navWrapper}>
            <h2>Vrac Perso</h2>
            <div className={styles.nav}>
                <div className={styles.link}><NavLink to="/workspaces">Tableaux</NavLink></div>
            </div>
        </div>
    )
}

export default Nav
