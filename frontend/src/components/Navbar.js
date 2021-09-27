import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/userAction'
import './Navbar.css'

const Navbar = ({user}) => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const dispatch = useDispatch()
    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logoutUser())
    }
    return (
        <div className="nav-bar">
            <div className="nav-bar-container">
                <Link className="nav-bar-logo" to='/'> Ziad Blog</Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click?'fas fa-times': 'fas fa-bars'}></i>
                </div>
                <ul className={click?"nav-menu active" :"nav-menu"}>
                    <li className="nav-item"><Link to='/' className="nav-link" onClick={handleClick}>Home</Link></li>
                    <li className="nav-item"><Link to='/problems' className="nav-link" onClick={handleClick}>problems</Link></li>
                    <li className="nav-item"><Link to='/profile' className="nav-link" onClick={handleClick}>Profile</Link></li>
                    <li className="nav-item"><Link to='/users' className="nav-link" onClick={handleClick}>Users</Link></li>
                    <li className="nav-item"><Link to='/about' className="nav-link" onClick={handleClick}>About</Link></li>
                    <li className="nav-item"><Link to='/contact' className="nav-link" onClick={handleClick}>Contact us</Link></li>
                    <li className="nav-item">{user?<Link to='/' className="nav-link-button" onClick={handleLogout}>Log out</Link>
                    :<Link to='/signUp' className="nav-link-button" onClick={handleClick}>SignUp</Link>}</li>
                </ul>
                {user?  <Link to='/' className="link-button"onClick={handleLogout}>Log out</Link>
                : <Link to='/signUp' className="link-button"onClick={handleClick}>SignUp</Link>}

               
            </div>

        </div>
    )
}

export default Navbar