import React, { Component } from 'react'
import axios from 'axios'

class Header extends Component {

state = {
    pic:'',
    role:''
}

componentDidMount(){
    let users =  JSON.parse(localStorage.getItem("user"));
    let {pic} = this.state;
    pic = users.user_pic;
    this.setState({pic})
    let {role} =this.state
    role = users.r
    this.setState({role});
}
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
    window.location.href= "/#"
    )
  localStorage.removeItem("user");
}


  render() {
    return (
        <header>
        <div className="row">
            <div className="col-sm-6">
                <div className="nv-btn">
                    <a href= "javascript:false" ><i className="fa fa-bars" aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="userevents">
                    <div className="notify">
                        <span className="noti-open">5</span>
                        <a className="noti-open"><i className="fa fa-bell" aria-hidden="true"></i></a>
                        <div className="notification-bx animateClose animateClose">
                            <div className="nt-bx-hd d-flex">
                                <div className="nt-title">notification</div>
                                <div className="nt-sttng"><a href="#"><i className="fa fa-cog" aria-hidden="true"></i></a></div>
                            </div>
                            <div className="nt-bx-bd d-flex">
                                <ul>
                                    <li className="d-flex nt-opn"><font><label>Tested Buggy</label> by Manoj Paul on Login a 2:07 pm</font><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                                    <li className="d-flex"><font><label>Tested Ok</label> by Manoj Paul on Login a 2:07 pm</font><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                                    <li className="d-flex nt-opn"><font><label>Tested Buggy</label> by Manoj Paul on Login a 2:07 pm</font><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                                    <li className="d-flex"><font><label>Tested Ok</label> by Manoj Paul on Login a 2:07 pm</font><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                                    <li className="d-flex"><font><label>Tested Buggy</label> by Manoj Paul on Login a 2:07 pm</font><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <a href="javascript:false" id="user-admin"><span><img src= {"http://pm.webq.co/"+this.state.pic} alt="img"/></span>{this.state.role}<i className="fa fa-caret-down" aria-hidden="true"></i></a>
                        <div className="admin-menu">
                            <ul>
                                <li className="row justify-content-center">
                                    <button className="btn btn-lg" onClick={this.logoutHandle.bind(this)}><i className="fa fa-sign-out fa-lg " aria-hidden="true"></i>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
  }
}
export default Header;