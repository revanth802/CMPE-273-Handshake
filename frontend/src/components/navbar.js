import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../App.css';
import log1 from '../assets/images/lo.png'
import ReactSearchBox from 'react-search-box'


//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in" fa-5x></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
    
        return(
            <div >
                {redirectVar}
    
                <nav class="navbar" style={{background: "#4034eb"}} >
                <div class="container-fluid">
                    
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="nav-item"><img src={log1} alt="handshake" height="50" width="50"/></li>
                        <li class="active"> <Link to='/student'  style={{color:"#fff",fontWeight:"bold"}}>Student</Link></li>
                        <li class="nav-link"><Link to='/company' style={{color:"#fff",fontWeight:"bold"}}>Company</Link></li>
                        <li class="nav-item"><Link to='/events' style={{color:"#fff",fontWeight:"bold"}}>Events</Link></li>
                        <li> <ReactSearchBox></ReactSearchBox></li>
                    </ul>
                    {navLogin}
              
            </nav>

          
        </div>
    
           
       
        
        )
    }
}

export default Navbar;