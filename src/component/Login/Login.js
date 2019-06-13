
import React,{ Component } from 'react';
import axios from 'axios';



class Login extends Component {


  state = {
    personData:
    {
    user:'',
    password:'',
    loggedIn:false},
    
};
      submitForm(e){
        e.preventDefault();

      let formData = new FormData();
      formData.append('username', this.state.personData.user);
      formData.append('password', this.state.personData.password);
      
      axios({
        method: 'post',
        url: '  http://pm.webq.co/api/login.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response)=>{
          //handle success
          let {personData} = this.state;
          personData.loggedIn = true;
          this.setState({personData})
          console.log(personData);
            let key = response.data.record.key;
            let token = response.data.record.token;
            let  id  = response.data.record.userid;
            let username = response.data.record.user_name;
            let pic = response.data.record.user_profile_pic;
            let role = response.data.record.userrole;
                  if(key){
                  
                 
                    const user = {token_key:token,user_id:id,user_name:username,user_pic:pic,r:role,loggedIn:this.state.personData.loggedIn}
                    ;
                      localStorage.setItem("user",JSON.stringify(user));
                  
                        window.location.href= "#/tasks/:id";
                   
                     
                  }
                  else{alert("error");}
          
        
          
      })
    }

    render() {
     
   
      document.title = "Login";
        return (
            <div>
         <div className="login-p" >
      <div className="user-login">
          <div className="user-logo">
              <span><img src="images/webqlogo-user.png" alt=".."/></span>
            </div>  
            <div className="user-form">
            <form>
              <div className="form-group">
                  <input type="email" className="form-control" name="name"  placeholder="Email"  value={ this.state.personData.user} onChange={(e)=>{
                                                    let {personData} =this.state;
                                                    
                                                    personData.user = e.target.value;
                                                    
                                                    this.setState({ personData });
                                                    }} required/>

                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password"  placeholder="Password"  value={this.state.personData.password} onChange={(e)=>{
                                                    let {personData} =this.state;
                                                    
                                                    personData.password = e.target.value;
                                                    
                                                    this.setState({ personData });
                                                    console.log(personData);
                                                    }} required/>
                                                  
                </div>
                <div className="form-group">
                  <button className="btn btn-blue" onClick={e=>this.submitForm(e)}>Login</button> 
                </div>
                </form>
            </div>
        </div>
     </div>
     </div>
          );
    }
   }
   export default Login;



