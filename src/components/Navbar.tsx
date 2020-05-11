import React from 'react'
import {Link} from "react-router-dom";
import logo from '../img/first_draft.png'

const Navbar: React.FC = () => {
    return (
        <div>
            
                <div className="mobile-logo">
                    <img src={logo} alt="white-logo.svg"></img>
                </div>
            
            <nav>
                
                <div className="_9 nav">
                    <Link className="nav-logo" to="/">
                        <img src={logo} alt="white-logo.svg"></img>
                    </Link>
                    <div className="btn-group">
                        <Link className="btn btn-tertiary" to="/about">About honest data</Link>
                        <Link className="btn btn-tertiary" to="/contact">
                            <i className="fad fa-phone"></i>
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar