import React, { Component } from 'react'
import Nav from '../Nav/nav'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class Projects extends Component {
    state = {
        
        details:[],
        offset:0,
        limit:10,
        name:'',
        assign:[],
        slt:'',
        act:'',
        userId:'',
        search:'',
        options: [
            {
              name: '-- Select Status Filter --',
              value: '',
            },
            {
              name: 'Opened',
              value: 'Opened',
            },
            {
              name: 'Assigned',
              value: 'Assigned',
            },
            {
                name: 'Canceled',
                value: 'Canceled',
              },
              {
                name: 'Completed',
                value: 'Completed',
              },
              {
                name: 'Reopened',
                value: 'Reopened',
              },
              {
                name: 'Failed',
                value: 'Failed',
              },
              {
                name: 'Awating Payment',
                value: 'AwatingPayment',
              },
              {
                name: 'Payment Done',
                value: 'PaymentDone',
              },
              {
                name: 'In-House',
                value: 'In-House',
              },
          ]
    };
 
    //get Data
 componentDidMount(){ 
  document.title ="Project"
     //user Details 
    let users =  JSON.parse(localStorage.getItem("user"));
    let {name} = this.state;
        name = users.user_name;
        this.setState({name})
        let id = users.user_id;
      
        let formData = new FormData();
        formData.append('user_id',id);
        formData.append('uassign',this.state.userId);
        formData.append('status',this.state.slt);
        formData.append('action',this.state.act);
        formData.append('off_set',this.state.offset);
        formData.append('lmt_set',this.state.limit);
        formData.append('pro_srch',this.state.search);
   // console.log(id)
   // console.log(this.state.userId)
   // console.log(this.state.slt)
   // console.log(this.state.act)
   // console.log(this.state.offset)
   // console.log(this.state.limit)

    axios({
      method: 'post',
      url: 'http://pm.webq.co/api/fetch_project_api.php',
      data: formData,
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


        //Fetch for infinite scroll
        fetchData() {
            console.log(123);
             
        let {offset,limit} = this.state;
        offset = offset + limit;
        this.setState({offset});
        console.log(offset);
        

        let users = JSON.parse(localStorage.getItem("user"));
        let id = users.user_id;
      
        let formData = new FormData();
        formData.append('user_id',id);
        formData.append('uassign',this.state.userId);
        formData.append('status',this.state.slt);
        formData.append('action',this.state.act);
        formData.append('off_set',this.state.offset);
        formData.append('lmt_set',this.state.limit);
        formData.append('pro_srch',this.state.search);
        
        axios({
        method: 'post',
        url: 'http://pm.webq.co/api/fetch_project_api.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
        if(res.data){
        let {details} = this.state;
        details = details.concat(res.data.record);
        this.setState({details})
        console.log(details);
        }
        else{
        //console.log("error");
        }
        })
      
        };


        //Fetch data through filter
        change(ev){
          
            this.setState({[ev.target.name]: ev.target.value});// set the value taken form select
            setTimeout(() => {
                if(this.state.act === 'Active'){
                  
                    if(this.state.slt === 'Completed'||this.state.slt === 'Canceled'||this.state.slt === 'Failed'){
                      let {slt} =this.state;
                         slt = '';
                         this.setState({slt});
                    }
                   
                    let{options} =this.state;
                        options =  [ {
                            name: '-- Select Status Filter --',
                            value: '',
                          },
                          {
                            name: 'Opened',
                            value: 'Opened',
                          },
                          {
                            name: 'Assigned',
                            value: 'Assigned',
                          },
                          {
                            name: 'Reopened',
                            value: 'Reopened',
                          },
                            {
                              name: 'Awating Payment',
                              value: 'AwatingPayment',
                            },
                            {
                              name: 'Payment Done',
                              value: 'PaymentDone',
                            },
                            {
                              name: 'In-House',
                              value: 'In-House',
                            }]
                            this.setState({options});
                            
                            
                        } 
               else if(this.state.act === 'Inactive'){

                       if(this.state.slt === 'AwatingPayment'||this.state.slt === 'PaymentDone'||this.state.slt === 'Opened'||this.state.slt === 'In-House'||this.state.slt === 'Reopened'||this.state.slt === 'Assigned'){
                         let {slt} =this.state;
                         slt = '';
                         this.setState({slt});
                       }
                   
                    let{options} =this.state;
                    options =  [ {
                        name: '-- Select Status Filter --',
                        value: '',
                      },
                      {
                          name: 'Canceled',
                          value: 'Canceled',
                        },
                        {
                          name: 'Completed',
                          value: 'Completed',
                        },
                        {
                          name: 'Failed',
                          value: 'Failed',
                        }]
                        this.setState({options});
                        
                }
                else {
                    let{options} =this.state;
                  options = [
                        {
                          name: '-- Select Status Filter --',
                          value: '',
                        },
                        {
                          name: 'Opened',
                          value: 'Opened',
                        },
                        {
                          name: 'Assigned',
                          value: 'Assigned',
                        },
                        {
                          name: 'Reopened',
                          value: 'Reopened',
                        },
                        {
                            name: 'Canceled',
                            value: 'Canceled',
                          },
                          {
                            name: 'Completed',
                            value: 'Completed',
                          },
                          {
                            name: 'Failed',
                            value: 'Failed',
                          },
                          {
                            name: 'Awating Payment',
                            value: 'AwatingPayment',
                          },
                          {
                            name: 'Payment Done',
                            value: 'PaymentDone',
                          },
                          {
                            name: 'In-House',
                            value: 'In-House',
                          },
                      ]
                      this.setState({options});
                }
                
                // console.log(this.state.slt)
                // console.log(this.state.act)
                // console.log(this.state.offset)
                // console.log(this.state.userId)
                // console.log(this.state.limit)
                // console.log(this.state.search)
                
                  let users =  JSON.parse(localStorage.getItem("user"));
                  let id = users.user_id;
                  console.log(id)
                 

                let formData = new FormData();
                formData.append('user_id',id);
                formData.append('uassign',this.state.userId);
                formData.append('status',this.state.slt);
                formData.append('action',this.state.act);
                formData.append('off_set',this.state.offset);
                formData.append('lmt_set',this.state.limit);
                formData.append('pro_srch',this.state.search);
            
                
                axios({
                    method: 'post',
                    url: 'http://pm.webq.co/api/fetch_project_api.php',
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
                        
                        console.log(res.data);
                        }
                        else{
                        console.log("error");
                        }
                    
        })
            }, 300);
            
    }
    //get data-id for url

    getData(eve){
        let id = parseInt(eve.target.getAttribute("data-id"));
        ;
        window.location.href= "#/tasks/"+id;
       
    }
            
  render() {
    document.title = "Task";
  
    let Option = this.state.options.map((option)=>{
        return(
            <option  key={option.value} value={option.value}>
            {option.name}</option>
        )
    })
    let i=1;
    let assign = this.state.assign.map((assigns)=>{
          
        return (
            <option key ={`${assigns.user_id}`} value={`${assigns.user_id}`}>{assigns.name_name}</option>
        )
      })
    let details = this.state.details.map((detail,i)=>{
          
        return (
        <tr key={i}>
        <td  className="taskno"><span>{i+1}</span></td>
        <td className="p-number"><input type="text" size="3" className="form-control"  defaultValue={`${detail.project_priority}`}/></td>
        <td className="p-name"><div className="p-title" data-id={detail.project_id} onClick={this.getData.bind(this)}>{detail.project_name}</div><div><a href="#" data-toggle="tooltip" title="Update"><i className="fa fa-refresh" aria-hidden="true"></i></a><a href="#" data-toggle="tooltip" title="Content"><i className="fa fa-file-text" aria-hidden="true"></i></a><a href="#" className="p-task" data-toggle="tooltip" title="Task">10</a><label className="p-checkbx"  data-toggle="tooltip" title="Mark as ready"><input type="checkbox"/></label></div></td>
        <td className="status text-g">{detail.project_status}</td>
        <td><span>{detail.status_modified}</span></td>
        <td className="name"><span data-toggle="tooltip" title={detail.role}>{detail.assigned_to}</span></td>
        <td className="name"><span data-toggle="tooltip" title=" ">{detail.project_owner}</span></td>
        <td className="name"><span data-toggle="tooltip" title={detail.pro_manager_role}>{detail.project_manager}</span></td>
        <td className="est-tm"><span data-toggle="tooltip" title="Anupom Roy 334:45 hrs Rakesh Nandy 24:00 hrs
            Dipan Karmakar 40:25 hrs
            Mahitosh Dey 173:15 hrs">Tkn:{detail.hours_given}</span><span data-toggle="tooltip" title="Anupom Roy 334:45 hrs Rakesh Nandy 24:00 hrs
            Dipan Karmakar 40:25 hrs
            Mahitosh Dey 173:15 hrs">Est:{detail.hours_taken}</span></td>
         <td>{detail.agreed_hours}</td>
         <td><div>Start:{detail.time_init}</div><div>Finish: {detail.time_finish}</div></td>
         <td><span data-toggle="tooltip" title={detail.create_role}>{detail.created}</span></td>
         <td className="penalty-bg"></td>
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
                <p>{this.state.name}</p>
            </div>
            <div className="col-sm-6">
                <div className="serch-bx">
                    <div className="serch-br">
                        <input type="search" name="search"  className="form-control" placeholder="Search" onChange = {this.change.bind(this)}/>
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
                        	<label>Filter</label>
                            <select name="act" className="form-control" onChange={this.change.bind(this)}>
                                <option value="">-- Select All --</option>
                                <option value ="Active">Active</option>
                                <option value ="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                    	<div className="filter">
                        	<label>Filter by</label>
                            <select name ="slt" key={this.state.slt} value = {this.state.slt} className="form-control" onChange={this.change.bind(this)} >  {/*select and send option to function */}
                                 {Option} 
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                    	<div className="filter">
                        	<label>Assignee User</label>
                            <select name="userId" key={this.state.userId} value = {this.state.userId} className="form-control"  onChange ={this.change.bind(this)}>
                                {assign}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3 text-center">
                    	<label className="show-status">Show status count <input type="checkbox"/></label>	
                    </div>
                </div>
            </div>	
            <div className="task-bx">
            <InfiniteScroll
                        dataLength={this.state.details.length}
                        next={this.fetchData.bind(this)}
                        hasMore={true}
                        loader={<h6 >Data End..</h6>}> 
                            {
                    <table className="table custom-table">
                        <thead className="table custom-table">
                            <tr>
                                <th width="3%" className="text-center">#</th>
                                <th width="8%" className="text-center"><i className="fa fa-list" aria-hidden="true"></i></th>
                                <th width="20%">Project name</th>
                                <th width="6%" className="text-center">Status</th>
                                <th width="10%">Status modified</th>
                                <th width="15%" className="text-center">Assigned to</th>
                                <th width="13%">Project owner</th>
                                <th width="12%">Project manager</th>
                                <th width="12%">Hours</th>
                                <th width="6%">Agreed hours</th>
                                <th width="12%">Date - time</th>
                                <th width="7%">Created</th>
                                <th width="7%">Award/penalty amount</th>
                            </tr>
                       
                        </thead>
                            
                         <tbody>{details}</tbody>
                    </table>}
                    </InfiniteScroll>
            </div>
        </div>
           <Footer/>
        </div>
    </div>

    )
  }
}
