import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    return (
        <div className='navbar-comp'>
            <Link to="/" style={{textDecoration : 'none'}}>
                <h4 id='all_tasks'>All Tasks</h4>
            </Link>

            <Link to="/completed" style={{textDecoration : 'none'}}>
                <h4 id='completed_tasks'>Completed Tasks</h4>
            </Link>

            <Link to="/pending" style={{textDecoration : 'none'}}>
                <h4>Pending Tasks</h4>
            </Link>


        </div>
    )
}

export default Navbar