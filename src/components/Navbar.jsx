import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/ypf-logo.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <img src={logo} alt="logo-ypf" style={{ width: '50px', marginRight: '10px' }} />
                    <Link className="navbar-brand" to="/">
                        <h3 style={{ margin: 0, padding: 0 }}>YPF - Data Management</h3>
                    </Link>
                </div>

                <div className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plus">Saber más</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/main">Panel</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar