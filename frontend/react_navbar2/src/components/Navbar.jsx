import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="./" style={styles.navLink}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="./About" style={styles.navLink}>About</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="./Contact" style={styles.navLink}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
    },
};

export default Navbar;