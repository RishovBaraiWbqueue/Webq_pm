import React,{ Component } from "react";
import {Link} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Header from '../Header/header';

class TASK extends Component{
  constructor(props) {
    super(props);
this.state={id:'',
            name:'',       role:'',
            picture:'',    details:[],
            offset:0,     limit:10,
            pro_list:[],   slt1:'',
            proname:'',     uassign:[],
            tlist:[],       flt_tasklist:'',
            flt_assign:'',  proj_nm:"",
            flt_project:'', suggesstionBox:[],
            text:'',         pro_name:'',
            off:0,            srch:'',
          isChecked:true}

this.getuserdetails= this.getuserdetails.bind(this);
this.ckchange=this.ckchange.bind(this);
this.usserassigne=this.usserassigne.bind(this);
  };
  componentDidMount() {
    //get data from url
    document.title ="Task"
              if (localStorage.getItem("user") === null)
              {
                      
                      this.props.history.push("/");
              }
              else
              {
                    
              }        
         this.getuserdetails(this);
        //  this.getData(this);
         this.usserassigne(this);
         
         this.ckchange();
        
              if(this.props.match.params.id == ':id'){
                var proj_nm = '';
                this.setState({proj_nm});
              }
              else{
                var proj_nm=this.props.match.params.id;
                this.setState({proj_nm});
                 console.log(proj_nm)
                 var limit =10;
                 this.setState({limit});
              
                 console.log(limit)
                 var offset =0
                 this.setState({offset});
                 console.log(offset)
              }

  }

          taskRender() {
            if(this.state.isChecked == true){
               return   <select name="slt1" className="form-control" value={this.state.slt1} onChange={this.ckchange}>
                            <option value="">-- All TO DO(s) --</option>
                            <option value="Working">Working</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Tested Buggy">Tested Buggy</option>
                            <option value="Tested Wrong">Tested Wrong</option>
                            <option value="Buggy By Employer">Buggy By Employer</option>
                            <option value="Wrong By Employer">Wrong By Employer</option>
                            <option value="understood">Understood</option>
                        </select>
          }
          else if(this.state.isChecked == false){
            return  <select name="slt1" className="form-control" value={this.state.slt1} onChange={this.ckchange}>
                      <option value="">-- All Task(s) --</option>
                      <option value="Done">Done</option>
                      <option value="Opened">Opened</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Clarify">Clarify</option>
                      <option value="tested ok">Tested OK</option>
                      <option value="Working">Working</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Tested Buggy">Tested Buggy</option>
                      <option value="Tested Wrong">Tested Wrong</option>
                      <option value="Buggy By Employer">Buggy By Employer</option>
                      <option value="Wrong By Employer">Wrong By Employer</option>
                      <option value="understood">Understood</option>
                      <option value="Completed">Completed</option>
                      <option value="Reopened">Reopened</option>
                      <option value="Failed">Failed</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Approved By Employer">Approved By Employer</option>
                      <option value="Extra Work">Extra Work</option>
                      <option value="Pre-Assigned">Pre-Assigned</option>
                      <option value="Time Over">Time Over</option>
                      <option value="Confused By Employer">Confused By Employer</option>
                      <option value="Wrong By Employer">Wrong By Employer</option>
                      <option value="Stop Working">Stop Working</option>
                      <option value="Extra Time Approved">Extra Time Approved</option>
                      <option value="Awaiting">Awaiting</option>
                      <option value="Pause">Pause</option>
                   </select>
          }
        }
            // onchange text filter or search text form array
            onTextChange = (e) =>
            { 
            
              const value = e.target.value;
              let pro_name = [];
              let {proj_nm} = this.state;
                              proj_nm = "";
                              this.setState({proj_nm});
             
              // if(value.length > 0){
                console.log(this.state.proj_nm);
               
                setTimeout(  
                  function() { 
                          let formData = new FormData();
                     formData.append('keyup',this.state.text);
                     formData.append('pro_nm',this.state.proj_nm);
                     
                    axios({
                      method:'post',
                      url:'http://pm.webq.co/api/fetch_projectname.php',
                      data:formData,
                      config: { headers: {'Content-Type': 'multipart/form-data' }}
                   })
                   .then(res => {
                       if(res.data){
                           let {pro_list} = this.state;
                           pro_list = res.data.record;

                            this.setState({pro_list});
                          
                            console.log(pro_list);
                            console.log(this.state.text);
                           
                            }
                           else{
                           console.log("error");
                           }
                    })
                    
                    
                   
                    } .bind(this), 300 );
                
                   
                   
              // } 
                 this.setState(()=>({pro_name, text:value}));
        }
         // select the suggesstion 
         suggesstionSelection(value){
          this.setState(()=>({
            text: value,
            pro_list:[],
            proj_nm : this.props.match.params.id
          }))

        }
        // hidden input box to hold the value
        hiddeninputbox(eve){
          this.setState(()=>({
     
            pro_list:[],
           
            
          }))
          const text=eve.target.getAttribute("value")
            this.setState({text});
          
            const proj_nm=eve.target.getAttribute("data-id");
            this.setState({proj_nm})

             setTimeout( function(){
               
         }   .bind(this), 300 );
           
                this.ckchange();
           
          }
          //render the suggesstion against text input
          renderSuggesstions (){
            const {pro_list } =this.state;
          if(pro_list.length === 0){
            
              if(this.state.text == ''){
                
                  return(
                  <ul className="prolist" name="text" >
                      <li value= " " data-id=" " onClick={this.hiddeninputbox.bind(this)}  style={{cursor:'pointer'}}>select All</li>
                  </ul>
              )
                  }
              else {
                return null;
              }
          } 
              
              else {
          return (
       
            <ul className="prolist" name="text" >
                 {pro_list.map((item)=><li  data-id={item.proj_id}  key={item.proj_id}  value={`${item.proj_name}`}  onClick={this.hiddeninputbox.bind(this)}  style={{cursor:'pointer'}}>{item.proj_name}</li>)}
            </ul>

          )
              }
        
        }
//Login user details

  getuserdetails(e){
const userDetils = JSON.parse(localStorage.getItem('user'));
var idd=userDetils.user_id;
var username=userDetils.user_name;
var user_picture=userDetils.user_pic;
var user_role_pm=userDetils.r;
//console.log(user_role_pm);
  this.setState({
         id:idd,
        name:username,
        role:user_role_pm,
         picture:user_picture
         })
  }

  fetchData() {
      let {offset,limit} = this.state;
      offset = offset + limit;
      this.setState({offset});
      console.log(offset);
      // setTimeout(  
      //   function() {
        let users = JSON.parse(localStorage.getItem("user"));
        let idd_u = users.user_id;

        let formDt = new FormData();
          formDt.append('user_id',idd_u);
          formDt.append('todo',this.state.slt1);
          formDt.append('project',this.state.proj_nm);
          formDt.append('tasklist',this.state.flt_tasklist);
          formDt.append('uassign',this.state.flt_assign);
          formDt.append('off_set',this.state.offset);
          formDt.append('lmt_set',this.state.limit);
          formDt.append('task_srch',this.state.srch);
          formDt.append('role',this.state.role);
            

          axios({
          method: 'post',
          url: 'http://pm.webq.co/api/filter_pm_api.php',
          data: formDt,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
            .then(res => {
                if(res.data){
                    let {details} = this.state;
                    details = details.concat(res.data.record);
                    this.setState({details})
                    //console.log(details);
                }
                else{
                //console.log("error");
                }
          })
        // }.bind(this), 300 );
}


//fetch for usser assigned

 usserassigne(){
      setTimeout(  
      function() { 
              let formData = new FormData();
                formData.append('keyup',this.state.nam);
                  axios({
                    method:'post',
                    url:'http://pm.webq.co/api/fetch_select_assignname_api.php',
                    data:formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
      .then(res => {
        //console.log(res);
            if(res.data){
                let {uassign} = this.state;
                uassign = res.data.record;
                this.setState({uassign})
                //console.log(details);
                }
                else{
                  console.log("error");
                }
        }) 
        } .bind(this), 300 );
 }


//Filter function

  ckchange(ev){

   if(typeof(ev) == "undefined")
   {
        //console.log("hello");
   }
   else if(ev.target.name)
   {
    this.setState({[ev.target.name]: ev.target.value});
   }
   else{
    
          if(ev.target.getAttribute("data-id")=="true"){
            let {isChecked}=this.state;
            isChecked=false;
            this.setState({isChecked});
            console.log(this.state.isChecked);
            
            
            
          }
          else if(ev.target.getAttribute("data-id")=="false"){
             let {isChecked}=this.state;
            isChecked=true;
            this.setState({isChecked});
            console.log(this.state.isChecked); 
           

          }
  }

  setTimeout(  
  function() {
    console.log(this.state.flt_assign);
    console.log(this.state.flt_tasklist);
    console.log(this.state.slt1);
    console.log(this.state.srch);
    console.log(this.state.proj_nm);
    console.log(this.state.offset);
    console.log(this.state.role);
    console.log(this.state.isChecked);
    
       const abc = JSON.parse(localStorage.getItem('user'));
       var idd_u=abc.user_id;
   

       var formDt = new FormData();
       formDt.append('user_id',idd_u);
      formDt.append('todo',this.state.slt1);
      formDt.append('project',this.state.proj_nm);
      formDt.append('tasklist',this.state.flt_tasklist);
      formDt.append('uassign',this.state.flt_assign);
      formDt.append('off_set',this.state.off);
      formDt.append('lmt_set',this.state.limit);
      formDt.append('task_srch',this.state.srch);
      formDt.append('role',this.state.role);
      
        
       
        axios({
         method:'post',
         url:'http://pm.webq.co/api/filter_pm_api.php',
         data:formDt,
         config: { headers: {'Content-Type':'multipart/form-data'}}
         })
       .then(res => {
        console.log(res);
          if(res.data){
            let {details} = this.state;
           details=res.data.record;
          
            this.setState({details})
            
            let {off} =this.state;
            off = 0;
            this.setState({off});
            
           //console.log();
             }
            else{
            console.log("error");
           }       
    })
    //input proj Name

    let formData = new FormData();
    formData.append('keyup',this.state.text);
    formData.append('pro_nm',this.state.proj_nm);
    
   axios({
     method:'post',
     url:'http://pm.webq.co/api/fetch_projectname.php',
     data:formData,
     config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
  .then(res => {
      if(res.data){
          let {pro_list} = this.state;
          pro_list = res.data.record;
        
        
           this.setState({pro_list});
         
           //console.log(pro_list);
          }
          else{
          console.log("error");
          }
   })

   //fetch for alltasklist filter

      let form = new FormData();
     form.append('tlist',this.state.proj_nm);

    axios({
      method:'post',
      url:'http://pm.webq.co/api/fetch_select_tasklist_api.php',
      data:form,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
   })
   .then(res => {
    console.log(res);
        if(res.data){
            let {tlist} = this.state;
            tlist = res.data.record;
             this.setState({tlist})
            //console.log(details);
             }
            else{
            console.log("error");
            }
    }) 

  } .bind(this), 300 );
}

//send data details page

senddata(eve){
  let id=parseInt(eve.target.getAttribute("data-id"));
  window.location.href="http://pm.webq.co/task-conversation.php?task_id="+id;
}
   render() {

//separate values for user role in map
  let i=1;
let details = this.state.details.map((detail,i)=>{

return (
<tr key={detail.task_id}>
<td className="taskno"><span>{i+1}</span></td>
<td className="p-name"><div className="p-title" data-id={detail.task_id} onClick={this.senddata.bind(this)}>{detail.taskname}</div><div><a href="#" data-toggle="tooltip" title={`${detail.taskcontent}`}><i className="fa fa-file-text" aria-hidden="true"></i></a><span data-toggle="tooltip" title="Comments">1</span><span data-toggle="tooltip" title="Tested Buggy(3)">3</span><span data-toggle="tooltip" title="Time over">1</span></div></td>
<td className="status text-g"><span>{detail.work_status}</span></td>
<td>{detail.task_list_name}</td>
<td>{detail.project_name}</td>
<td><div>{detail.modify_by}</div><div>{detail.modifytime}</div></td>
<td className="name"><span data-toggle="tooltip" title={`${detail.role}`}>{detail.assign_to}</span></td>
<td><div>Est:{detail.estimate_houre}<span className="hours-hlght" data-toggle="tooltip" title="To much time">2:00 hrs</span></div><div>Tkn:{detail.estimate_houre}</div></td>
<td><div>{detail.created}</div><div>{detail.creation_date}</div></td>
<td></td>
<td>{detail.last_modified}</td>
</tr> 
)
})


//Map for Usser Assigned option

let uassign=this.state.uassign.map((user)=>{
return (
<option key={user.user_id} value={user.user_id}>{user.name_name}  {user.name_role}</option>
)
})

//Map for tasklist option

let tlist=this.state.tlist.map((usertasklist)=>{
return (
<option key={usertasklist.tasklist_id} value={usertasklist.tasklist_id}>{usertasklist.tasklist_name}</option>
)
})

      return (
         <div className="main-wrap d-flex">
  <nav className="sidenav">
      <div className="logo">
          <a href="#"><img src="images/webqlogo.png" alt=".."/></a>
        </div>
        <div className="menu">
            <ul>
              <li><Link to="/tasks/:id" refresh="true"><i className="fa fa-tachometer" aria-hidden="true"></i>Tasks</Link></li>
                <li><Link to="/tasklist" refresh="true"><i className="fa fa-tasks" aria-hidden="true"></i>Task List</Link></li>
                <li><Link to="/projects" refresh="true"><i className="fa fa-book" aria-hidden="true"></i>Projects</Link></li>
                <li><a href="#"><i className="fa fa-address-card" aria-hidden="true"></i>Worksheet</a></li>
                <li><a href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i>Performance</a></li>
                <li><a href="#"><i className="fa fa-trophy" aria-hidden="true"></i>Award</a></li>
                <li><Link to="/Logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Link></li>
            </ul>
        </div>
    </nav>
    <div className="main-dash">
     <Header/>
        <div className="dash-nm-bx">
          <div className="row">
              <div className="col-sm-6">
                  <p>{this.state.name}</p>
                </div>
                <div className="col-sm-6">
                  <div className="serch-bx">
                      <div className="serch-br">
                        <input type="search" className="form-control" name="srch" placeholder="Search" onChange={this.ckchange}/>
                            <button type="button" className="btn btn-serch"><i className="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="task-p">
          <div className="filter-bx">
              <div className="row">
                  <div className="col-sm-3">
                      <div className="filter">
                          <label>Status:<input type="checkbox" data-id={this.state.isChecked} checked={this.state.isChecked} onChange={this.ckchange}/>To Do(s)</label>


                                
                             {this.taskRender()} 
                          

                        </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="filter">
                          <label>Project</label>

                              <input className="form-control" name="nam" value={this.state.text} onChange = {this.onTextChange} type="text"  />
                               
                                <ul >
                                      {this.renderSuggesstions()}
                                </ul>
                        </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="filter">
                          <label>Tasklist</label>
                            <select name="flt_tasklist" className="form-control" value={this.state.slt_tasklist} onChange={this.ckchange}>
                              <option value=" ">All Tasklist</option>
                              {tlist}

                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="filter">
                          <label>User Assigned</label>

                            <select name="flt_assign" className="form-control" value={this.state.assign} onChange={this.ckchange}>
                                <option value=" ">All Users</option>
                              {uassign}

                            </select>

                        </div>
                    </div>
                </div>
            </div>  
            <div className="task-bx">

              <InfiniteScroll          
                    dataLength={this.state.details.length}
                    next={this.fetchData.bind(this)}
                    hasMore={true}
                    loader={<h6 >Data End..</h6>} style={{overflow:'false'}}> 
                    {<table className="table custom-table">
                    <thead>
                    <tr>
                    <th width="3%" className="text-center">#</th>
                    <th width="10%">Task Name</th>
                    <th width="5%">Status</th>
                    <th width="7%">Task list Name</th>
                    <th width="13%">Project Name</th>
                    <th width="12%">Status Modified</th>
                    <th width="10%">Assign To</th>
                    <th width="13%">Hours</th>
                    <th width="12%">Created</th>
                    <th width="7%">Finishing Date</th>
                    <th width="7%">Last Modified</th>
                    </tr>
                    </thead>
                    <tbody>{details}</tbody>
                    </table>}
            </InfiniteScroll>

            </div>
        </div>
        <footer><span>WEBQ</span> Project management system</footer>
    </div>
</div>
       
      );
   }
}
export default TASK;