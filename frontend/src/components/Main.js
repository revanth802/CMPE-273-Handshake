import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import home from './home/home';
import student from './student/student';
import navbar from './navbar';

import reg from './student/reg';
import dashboard from './student/dashboard';
import company from './company/company';
import cdashboard from './company/cdashboard';
import creg from './company/creg';


class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={navbar}/>
                <Route path="/student" component={student}/>
                <Route path="/company" component={company} />
                <Route path="/reg" component={reg} />
                <Route path="/dashboard" component={dashboard} />
                <Route path="/cdashboard" component={cdashboard} />
                <Route path="/creg" component={creg} />
           
               
            </div>
        )
    }
}
//Export The Main Component
export default Main;