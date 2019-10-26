import React, {Component} from 'react';
import './SideBar.scss'
import {Link} from "react-router-dom";

class SideBar extends Component {
    render() {
        return (
            <div className="sidenav">

                <span>Menu</span>

                <ul>
                    <li>
                        <Link to="/order">Order Coffee</Link>
                    </li>
                    <li>
                        <Link to="/about">Admin Panel</Link>
                    </li>
                </ul>


            </div>
        );
    }
}

export default SideBar;
