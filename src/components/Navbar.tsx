import React from 'react'
import {Link} from "react-router-dom";
import logo from '../img/first_draft.png'

const Navbar: React.FC = () => {
    return (
        <div>
            <Link to="/">
                <div className="mobile-logo">
                    <img src={logo} alt="white-logo.svg"></img>
                </div>
            </Link>
            
            <nav>
                <div className="_9 nav">
                    <Link className="nav-logo" to="/">
                        <img src={logo} alt="white-logo.svg"></img>
                    </Link>
                    <div className="btn-group">
                        <Link className="btn btn-tertiary" to="/about">
                            <i className="fad fa-info"></i>
                            <span className="hideOnMobile">About honest data</span>
                        </Link>
                        <Link className="btn btn-tertiary" to="/contact">
                            <i className="fad fa-envelope"></i>
                            <span className="hideOnMobile">Contact</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar