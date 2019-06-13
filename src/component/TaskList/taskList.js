import React, { Component } from 'react'
import Header from '../Header/header'
import Nav from '../Nav/nav' 
import Footer from '../Footer/footer';
import axios from 'axios';


export default class TaskList extends Component {

    state = {
        details:[],
        name:'',
        assign:[],
        userId:'',
        limit:30,
        offset:0,
        search:'',
        pro_list:[],
        pro:'',
        alltask:''
    }

    componentDidMount(){
        let users =  JSON.parse(localStorage.getItem("user"));
       let  id = users.user_id;
   
        let {name} = this.state;
            name = users.user_name;
            this.setState({name})
        
         let formData = new FormData();
         formData.append('user_id',id);
         formData.append('off_set',this.state.offset);
         formData.append('lmt_set',this.state.limit);
         formData.append('uassign',this.state.userId);
         formData.append('srch',this.state.search);
  
        axios({
          method: 'post',
          url: 'http://pm.webq.co/api/tasklist_api.php',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(res => {
        if(res.data){
          let {details} = this.state;
          details = res.data.record;
          this.setState({details})
          //console.log(details);
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
        //console.log(assign);
      }
      else{
       console.log("error");
      }
      })

    //Fetch projectname
    axios({
            method:'post',
            url:'http://pm.webq.co/api/projectname.php',
            data:formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {
            if(res.data){
            let {pro_list} = this.state;
            pro_list = res.data.record;
            this.setState({pro_list});
            //console.log(pro_list)
            }
            else{
            console.log("error");
            }
            })
    }



        change(ev){
            this.setState({[ev.target.name]: ev.target.value});// set the value taken form select
            setTimeout(() => {
               
                // console.log(this.state.alltask);
                // console.log(this.state.userId); 
         
                let users =  JSON.parse(localStorage.getItem("user"));
                let id = users.user_id;
                           

                let formData = new FormData();
                formData.append('user_id',id);
                formData.append('off_set',this.state.offset);
                formData.append('lmt_set',this.state.limit);
                formData.append('uassign',this.state.userId);
                formData.append('srch',this.state.search);
                formData.append('proj',this.state.pro);
                formData.append('alltask',this.state.alltask);
                                           
                axios({
                    method: 'post',
                    url: 'http://pm.webq.co/api/tasklist_api.php',
                    data: formData,
                      config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(res => {
                        if(res.data){
                        let {details} = this.state;
                        details = res.data.record;
                        
                        this.setState({details})
                        let {offset,limit} =this.state;
                        offset = 0;
                        limit =10;
                        
                        this.setState({offset,limit});
                        
                        //console.log(res.data);
                        }
                        else{
                        console.log("error");
                        }
                    
        })
        }, 300);
            
    }

  render() {
    let Pname=this.state.pro_list.map((pnm)=>{
return (
<option key={pnm.proj_id} value={pnm.proj_id}>{pnm.proj_name}</option>
)
})
    let assign = this.state.assign.map((assigns)=>{
          
        return (
            <option key={`${assigns.user_id}`} value={`${assigns.user_id}`}>{assigns.name_name}</option>
        )
      })
      let i = 1;
    let details = this.state.details.map((detail,i)=>{
          
        return (
                        <tr key ={detail.task_list_id} >
                            <td class="taskno text-center"><span>{i+1}</span></td>
                            <td className="p-name"><div className="p-title">{detail.task_list_name}</div><div><a href="#" data-toggle="tooltip" title="Edit"><i className="fa fa-pencil" aria-hidden="true"></i></a><a href="#" data-toggle="tooltip" title="Delete"><i className="fa fa-trash-o" aria-hidden="true"></i></a><a href="#" data-toggle="tooltip" title="Content"><i className="fa fa-file-text" aria-hidden="true"></i></a><a href="#" className="p-task" data-toggle="tooltip" title="Task">10</a><label className="p-checkbx"  data-toggle="tooltip" title="Mark as ready"><input type="checkbox"/></label></div>
                            </td>
                            <td className="status text-g"><span>Assigned</span></td>
                            <td>{detail.project_name}</td>
                            <td><div>{detail.modify_by}</div><div>{detail.modification_time}</div></td>
                            <td className="name"><span data-toggle="tooltip" title="Designer">{detail.assign_to}</span></td>
                            <td><div>Est: {detail.hour_estimate}<span>2:00 hrs</span></div><div>Tkn: {detail.hour_taken}</div></td>
                            <td><div>{detail.created_by}</div><div>13 May,2019 12:05 AM</div></td>
                            <td>{detail.finish_date}</td>
                        </tr> 
        )
      })
    return (
        <div className="main-wrap d-flex">
        <Nav/>
        <div className="main-dash">
        <Header/>
            <div className="dash-nm-bx">
                <div className="row">
                    <div className="col-sm-6">
                        <p>{this.state.name}<a href="" className="btn btn-info">Create new task list</a></p>
                    </div>
                    <div className="col-sm-6">
                        <div className="serch-bx">
                            <div className="serch-br">
                                <input type="search" name="search"  className="form-control" placeholder="Search" />
                                <button type="button" className="btn btn-serch"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="task-p">
                <div className="filter-bx">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="filter">
                                <label>Status</label>
                                <select name="alltask" value={this.state.alltask} className="form-control" onChange ={this.change.bind(this)}>
                                    <option value="">All task status</option>
                                    <option value="Opened">Opened</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Canceled">Canceled</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Responed">Responed</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="filter">
                                <label>Project</label>
                                <select  name="pro" value={this.state.pro} className="form-control" onChange ={this.change.bind(this)}>
                                    {Pname}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="filter">
                                <label>User</label>
                                <select name="userId" value={this.state.userId} className="form-control"  onChange ={this.change.bind(this)}>
                                    {assign}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="task-bx">
                    <table className="table custom-table tasklist-table">
                        <thead>
                        <tr>
                            <th width="3%" className="text-center">#</th>
                            <th width="10%">Task list name</th>
                            <th width="7%">Status</th>
                            <th width="15%">Project name</th>
                            <th width="10%">Status modified</th>
                            <th width="10%" className="text-center">Assigned to</th>
                            <th width="10%">Hours</th>
                            <th width="10%">Created</th>
                            <th width="10%">Finishing date - time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    
    )
  }
}
