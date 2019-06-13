
import React,{ Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../Header/header';
import Nav from '../Nav/nav';
import Filter from '../Filter/filter';
import Search from '../Search/search';
import Footer from '../Footer/footer';

class Task extends Component {
    
    state = {
        
        details:[],
        offset:0,
        limit:10,
    };
   
    //get Data
    componentDidMount(){  
        let users =  JSON.parse(localStorage.getItem("user"));
        let id = users.user_id;
        let token =  users.token_key;
       let idd=this.props.match.params.id;
        //console.log(idd);
        
        let formData = new FormData();
        formData.append('user_id',id);
        formData.append('off_set',this.state.offset);
        formData.append('lmt_set',this.state.limit);
        formData.append('token_key',token);
       

        axios({
          method: 'post',
          url: 'http://pm.webq.co/api/tasks_api.php',
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
               
    };
   
   //Fetch for infinte scroll
    fetchData() {
        //console.log(123);
     let {offset,limit} = this.state;
     offset = offset + limit;
     this.setState({offset});
     //console.log(offset);

     let users =  JSON.parse(localStorage.getItem("user"));
     let id = users.user_id;
     let token =  users.token_key;
     //console.log(token);
     
     let formData = new FormData();
     formData.append('user_id',id);
     formData.append('off_set',this.state.offset);
     formData.append('lmt_set',this.state.limit);
     formData.append('token_key',token);
     
    

             axios({
             method: 'post',
             url: 'http://pm.webq.co/api/tasks_api.php',
             data: formData,
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
                 console.log("error");
                 }
             
         })
   }
    
    render() {
    
        document.title = "Task";
        let i=1;
        let details = this.state.details.map((detail,i)=>{
              
            return (
            <tr key={detail.task_id}>
            <td className="taskno"><span>{i+1}</span></td>
            <td className="p-name"><div className="p-title">{detail.taskname}</div><div><a href="#" data-toggle="tooltip" title={`${detail.taskcontent}`}><i className="fa fa-file-text" aria-hidden="true"></i></a><span data-toggle="tooltip" title="Comments">1</span><span data-toggle="tooltip" title="Tested Buggy(3)">3</span><span data-toggle="tooltip" title="Time over">1</span></div></td>
            <td className="status text-g"><span>{detail.work_status}</span></td>
            <td>{detail.task_list_name}</td>
            <td>{detail.project_name}</td>
            <td><div>{detail.modify_by}</div><div>{detail.modifytime}</div></td>
            <td className="name"><span data-toggle="tooltip" title={`${detail.role}`}>{detail.assign_to}</span></td>
            <td><div>Est:{detail.estimate_houre}<span className="hours-hlght" data-toggle="tooltip" title="To much time">2:00 hrs</span></div><div>Tkn:{detail.estimate_houre}</div></td>
            <td><div>{detail.created}</div><div>{detail.creation_date}</div></td>
            <td>10 May,2019 7:08 PM</td>
            <td>{detail.last_modified}</td>
        </tr> 
            )
          })
        return (
                
        <div className="main-wrap d-flex">
            <Nav/>
            <div className="main-dash">
            <Header/>
            <div className="dash-nm-bx">
                <Search/>   
            </div>
          
                <div className="task-p">
                    <Filter/>
                    <div className="task-bx">
                    <InfiniteScroll
                        dataLength={this.state.details.length}
                        next={this.fetchData.bind(this)}
                        hasMore={true}
                        loader={<h4 >Data End..</h4>} >  
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
                <Footer/>
            </div>
        </div>

        );
    }
}
   export default Task;



