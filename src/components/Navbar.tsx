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
                    <Link className="btn btn-tertiary" to="/">Home</Link>
                    <Link className="btn btn-tertiary" to="/components">Components</Link>
                    <Link className="btn btn-tertiary" to="/charts">Charts</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar