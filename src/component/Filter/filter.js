import React, { Component } from 'react'

export default class Filter extends Component {
    state ={
        name:""
    }
    componentDidMount(){
        let users =  JSON.parse(localStorage.getItem("user"));
        let {name} = this.state;
        name = users.user_name;
        this.setState({name})
    }
  render() {
    return (
        <div className="filter-bx">
        <div className="row">
            <div className="col-sm-3">
                <div className="filter">
                    <label>Status:<input type="checkbox"/>To Do(s)</label>
                    <select className="form-control">
                        <option>-- All To Do(s) --</option>
                        <option>Working</option>
                        <option>Assigned</option>
                        <option>Tested Buggy</option>
                        <option>Tested Wrong</option>
                        <option>Buggy By Employer</option>
                        <option>Buggy By Employer</option>
                        <option>Wrong By Employer</option>
                        <option>Understood</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="filter">
                    <label>Project</label>
                    <input type="text" className="form-control" placeholder="Search By Project"/>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="filter">
                    <label>Tasklist</label>
                    <select className="form-control">
                        <option>All tasklists</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="filter">
                    <label>User Assigned</label>
                    <select className="form-control">
                        <option>{this.state.name}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>	
    )
  }
}
