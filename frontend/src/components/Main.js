import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import Home from './Home/home';
import Profile from './Profile/Profile';
import CompanyDashboard from './Company/Companydashboard';
import HeaderBar from './Util/HeaderBar';
import Events from './Events/Events';
import Applications from './Applications/Applications';
import Students from './Students/Students';
import studentprofile from './Students/studentprofile';
import CompanyLogin from "./Company/Company";
import { Provider } from "react-redux";
import store from "../ReduxModules/store/index";
import ViewApplications from "./Students/viewapplications";
import ViewEventApplications from './Events/viewEventApplications';
import StudentEvents from './Events/studentevents';
import CompanyProfile from './Company/companyprofile';
import StudentList from './Students/astudents';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <Provider store={store}>
            <div>
                {/*Render Different Component based on Route*/}
                <Route  path="/" component={HeaderBar}/> 
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/studentspage" component={StudentList}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/events" component={Events}/>
                <Route path="/applications" component={Applications}/>
                <Route path="/register" component={Register}/>
                <Route path="/students" component={Students}/>
                <Route path="/studentprofile/:id" component={studentprofile}/>
                <Route path="/companylogin" component={CompanyLogin}/>
                <Route path="/companydashboard" component={CompanyDashboard}/>
                <Route path="/viewapplications" component={ViewApplications}/>
                <Route path="/vieweventapplications" component={ViewEventApplications}/>
                <Route path="/studentevents" component={StudentEvents}/>
                <Route path="/companyprofile" component={CompanyProfile}/>
                {/*<Route path="/create" component={Create}/> */}
            </div>
            </Provider>
        )
    }
}
//Export The Main Component
export default Main;