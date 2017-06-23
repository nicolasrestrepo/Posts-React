import React from 'react'
import { Link } from 'react-router'
import styles from './Header.css'


function Header() {
    return (
        <header className={[styles.header, styles.text]}>
            <h1>Proyecto posts</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </header>
    )
}

export default Header