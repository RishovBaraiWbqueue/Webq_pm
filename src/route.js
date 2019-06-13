import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Login from "./component/Login/Login";
import TASK from "./component/Tasks/tasks";
import Projects from "./component/Projects/projects";
import TaskList from "./component/TaskList/taskList";
import Autocomplete from "./component/Autocomplete/autoComplete";
// import Taskloop from "./component/Taskloop";
import Logout from "./component/Logout/logout";


  const Routes = () =>{
   return (
     <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login}  />
            <Route path="/taskList" component={TaskList} />
            {/* <Route path="/tasks" component={TASK} /> */}
            <Route path="/projects" component={Projects} /> 
            <Route path="/autoComplete" component={Autocomplete} />
            <Route path="/tasks/:id" component={TASK} /> 
            <Route path="/logout" component={Logout} />  
          {/* <Route path="/Logout" component={logout} /> */}
          <Route component={Error}/>
        </Switch>
      </div>
     </HashRouter>
   );
 }

export default Routes;