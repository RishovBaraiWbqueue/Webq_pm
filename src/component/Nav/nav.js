import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

 class Nav extends Component {
    
    // logout
 logoutHandle(){
           
    let users =  JSON.parse(localStorage.getItem("user"));
    let id = users.user_id;

    
    let formData = new FormData();
    formData.append('user_id',id);
   

    axios({
      method: 'post',
      url: ' http://pm.webq.co/api/logout.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
  .then(
    window.location.href= "http://localhost:3000"
    )
  localStorage.removeItem("user");
}

  render() {
    return (
        <nav className="sidenav">
    	<div className="logo">
        	<a href="$"><img src="images/webqlogo.png" alt="img"/></a>
        </div>
        <div className="menu">
            <ul>
            	<li><Link to="/tasks/:id"><i className="fa fa-tachometer" aria-hidden="true"></i>Tasks</Link></li>
                <li><Link to="/taskList"><i className="fa fa-tasks" aria-hidden="true"></i>Task List</Link></li>
                <li><Link to="/projects"><i className="fa fa-book" aria-hidden="true"></i>Projects</Link></li>
                <li><a href="javascript: false"><i className="fa fa-address-card" aria-hidden="true"></i>Worksheet</a></li>
                <li><a href="javascript: false"><i className="fa fa-bar-chart" aria-hidden="true"></i>Performance</a></li>
                <li><a href="javascript: false"><i className="fa fa-trophy" aria-hidden="true"></i>Award</a></li>
                <li><a href="javascript: false" onClick={this.logoutHandle.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</a></li>
            </ul>
        </div>
    </nav>
    )
  }
}
export default Nav;
