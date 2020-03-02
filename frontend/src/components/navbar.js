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
                        <li><Link to="/student" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/student"><span class="glyphicon glyphicon-log-in" fa-5x></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
    
        return(
            /*
            <div >
                {redirectVar}
    
                <nav>
                <div>
                    
                    </div>
                    
                    

                    <nav class="navbar navbar-dark bg-primary">
                        
                    <ul class="navar-inverse">
                        <li ><img src={log1} alt="handshake" height="50" width="50"/></li>
                        <li > <Link to='/student'  style={{color:"#fff",fontWeight:"bold"}}>Student</Link></li>
                        <li ><Link to='/company' style={{color:"#fff",fontWeight:"bold"}}>Company</Link></li>
                        <li ><Link to='/events' style={{color:"#fff",fontWeight:"bold"}}>Events</Link></li>
                     
                    </ul>
 
</nav>

                    {navLogin}
              
            </nav>
            */

          
     
    
    <div>
            
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
            <li ><img src={log1} alt="handshake" height="50" width="50"/></li>
             
            </div>
            <ul class="nav navbar-nav">
          <li> <a class="navbar-brand">Handshake</a></li>
                <li class="active"><Link to="/student">Students</Link></li>
                <li><Link to="/company">Company</Link></li>
                <li><Link to="/">Jobs</Link></li>
                <li><Link to="/events">Events</Link></li>
            </ul>
            {/* {navLogin} */}
        </div>
    </nav>


</div>
           
       
        
        )
    }
}

export default Navbar;