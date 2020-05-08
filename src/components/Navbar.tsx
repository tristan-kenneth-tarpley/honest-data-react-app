import React from 'react'
import {Link} from "react-router-dom";
import logo from '../img/first_draft.png'

const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="_9 nav">
                <Link className="nav-logo" to="/">
                    <img src={logo} alt="white-logo.svg"></img>
                </Link>
                <div className="btn-group">
                    <Link className="btn btn-tertiary" to="/about">About honest data</Link>
                    <Link className="btn btn-tertiary" to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar