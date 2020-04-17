import React from 'react';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';

const Sidenav = () => {
  return (
    <div className="wrapper">
      <ul id="slide-out" className="sidenav sidenav-fixed" style={{ marginTop: "5%" }}>
        <li><a href="#!"><i className="material-icons">assessment</i>Dashboard</a></li>
        <li><div className="divider"></div></li>
        <li><a href="#!"><i className="material-icons">drafts</i>Articles</a></li>
        {/* <li><Link to="/analytics"><i className="material-icons">drafts</i>Articles</Link></li> */}
        <li><div className="divider"></div></li>

        <li><Link to="/analytics"><i className="material-icons">show_chart</i>Analytics</Link></li>
        <li><div className="divider"></div></li>
        <li><a href="#!"><i className="material-icons">message</i>Message</a></li>
        <li><div className="divider"></div></li>
        <li><a href="#!"><i className="material-icons">event</i>Calendar</a></li>
        <li><div className="divider"></div></li>
      </ul>
    </div>
  )
}

export default Sidenav;