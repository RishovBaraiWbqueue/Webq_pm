import React, { Component } from 'react'
import Header from '../Header/header'
import Nav from '../Nav/nav' 
import Footer from '../Footer/footer';
import axios from 'axios';


export default class TaskList extends Component {

    state = {
        details:[],
        name:'',
        assign:[]
    }

    componentDidMount(){
        let users =  JSON.parse(localStorage.getItem("user"));
       let  id = users.user_id;
   
        let {name} = this.state;
            name = users.user_name;
            this.setState({name})
        
        // let formData = new FormData();
     
        // formData.append('off_set',this.state.offset);
        // formData.append('lmt_set',this.state.limit);
        // formData.append('user_id',id)
      
       
    
        axios({
          method: 'post',
          url: 'http://pm.webq.co/api/tasklist_api.php',
        //   data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(res => {
        if(res.data){
          let {details} = this.state;
          details = res.data.record;
          this.setState({details})
          console.log(details);
        }
        else{
         console.log("error");
        }
    })
       //Fetch user Assign
       axios({
        method: 'get',
        url: 'http://pm.webq.co/api/fetch_select_assignname_api.php',
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(res => {
      if(res.data){
        let {assign} = this.state;
        assign = res.data.record;
        this.setState({assign})
        console.log(assign);
      }
      else{
       console.log("error");
      }
      })
    }
  render() {
    let assign = this.state.assign.map((assigns)=>{
          
        return (
            <option value={`${assigns.user_id}`}>{assigns.name_name}</option>
        )
      })
      let i = 1;
    let details = this.state.details.map((detail,i)=>{
          
        return (
                        <tr key ={detail.task_list_id} >
                            <td class="taskno text-center"><span>{i+1}</span></td>
                            <td class="p-name"><div class="p-title">{detail.task_list_name}</div><div><a href="#" data-toggle="tooltip" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></a><a href="#" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o" aria-hidden="true"></i></a><a href="#" data-toggle="tooltip" title="Content"><i class="fa fa-file-text" aria-hidden="true"></i></a><a href="#" class="p-task" data-toggle="tooltip" title="Task">10</a><label class="p-checkbx"  data-toggle="tooltip" title="Mark as ready"><input type="checkbox"/></label></div>
                            </td>
                            <td class="status text-g"><span>Assigned</span></td>
                            <td>{detail.project_name}</td>
                            <td><div>{detail.modify_by}</div><div>{detail.modification_time}</div></td>
                            <td class="name"><span data-toggle="tooltip" title="Designer">{detail.assign_to}</span></td>
                            <td><div>Est: {detail.hour_estimate}<span>2:00 hrs</span></div><div>Tkn: {detail.hour_taken}</div></td>
                            <td><div>{detail.created_by}</div><div>13 May,2019 12:05 AM</div></td>
                            <td>{detail.finish_date}</td>
                        </tr> 
        )
      })
    return (
        <div class="main-wrap d-flex">
        <Nav/>
        <div class="main-dash">
        <Header/>
            <div class="dash-nm-bx">
                <div class="row">
                    <div class="col-sm-6">
                        <p>{this.state.name}<a href="#" class="btn btn-info">Create new task list</a></p>
                    </div>
                    <div class="col-sm-6">
                        <div class="serch-bx">
                            <div class="serch-br">
                                <input type="search" class="form-control" placeholder="Search"/>
                                <button type="button" class="btn btn-serch"><i class="fa fa-search" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="task-p">
                <div class="filter-bx">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="filter">
                                <label>Status</label>
                                <select class="form-control">
                                    <option>All task status</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="filter">
                                <label>Project</label>
                                <select class="form-control">
                                    <option>Select all project</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="filter">
                                <label>User</label>
                                <select class="form-control">
                                    {assign}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>	
                <div class="task-bx">
                    <table class="table custom-table tasklist-table">
                        <tr>
                            <th width="3%" class="text-center">#</th>
                            <th width="10%">Task list name</th>
                            <th width="7%">Status</th>
                            <th width="15%">Project name</th>
                            <th width="10%">Status modified</th>
                            <th width="10%" class="text-center">Assigned to</th>
                            <th width="10%">Hours</th>
                            <th width="10%">Created</th>
                            <th width="10%">Finishing date - time</th>
                        </tr>
                        {details}
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    
    )
  }
}
