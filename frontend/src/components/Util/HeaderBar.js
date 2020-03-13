import React,{Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import {backend}  from "../../config";

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            headerArray : []
        }
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    componentDidMount(){
        axios.get(backend+'/tabHeaders')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    headerArray : this.state.headerArray.concat(response.data)
                });
            });
            
    }
    
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let image = null;
        var headers =null;
        
        if(cookie.load('cookie')){
            if(cookie.load('cookiename') === "company")
            {
            console.log("Able to read cookie", cookie.load('cookie'));
            
            headers = 
                (
                  
                    <ul className = "nav navbar-nav">
                    
                 

                        <li><Link style = {{color:'white'}} to="/companydashboard">Dashboard</Link></li>
                        <li><Link style = {{color:'white'}} to="/companyprofile">Profile</Link></li>
                        <li><Link style = {{color:'white'}} to="/events">Events</Link></li>
                        <li><Link style = {{color:'white'}} to="/studentspage">Students</Link></li>

                    
                    </ul>
                        
            )
            // })
        }
    
        if(cookie.load('cookiename') === "student")
        {
            console.log("Able to read cookie", cookie.load('cookie'));
            
             headers =  
                 
                     <ul className = "nav navbar-nav" >
                     
                     <li><Link style = {{color:'white'}} to="/home">Dashboard</Link></li>

                     <li><Link style = {{color:'white'}} to="/profile">Profile</Link></li>

                     <li><Link style = {{color:'white'}} to="/studentevents">Events</Link></li>

                     <li><Link style = {{color:'white'}} to="/">Q & A</Link></li>
                     <li><Link style = {{color:'white'}} to="/">Career Center</Link></li>
                     <li><Link style = {{color:'white'}} to="/applications">Applications</Link></li>


                     
                     </ul>    
             
            //  })
        }
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        {headers }
                        <li><Link  style = {{color:'white'}} to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
    }
        else{
            //Else display login button
            console.log("Not Able to read cookie");
            image = (
                
                    <img style = {{width:'100%',height:'100%',marginTop:'-20px'}}src={require('./Handshake.jpg')} alt="hs" />
                     )
            
            console.log({image})
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link style = {{color:'white'}} to="/register"><span className="glyphicon glyphicon-plus"></span> Register</Link></li>
                        <li><Link style = {{color:'white'}} to="/login"><span className="glyphicon glyphicon-log-in"></span> Student Login</Link></li>
                        <li><Link style = {{color:'white'}} to="/companylogin"><span className="glyphicon glyphicon-log-in"></span> Company Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;

        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to="/home"/>
        // }
        
        return(
            <div>
                {redirectVar}
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href = '/home'>Handshake</a>
                    </div>
                    
                    {navLogin}
                    <img src ={require("../Util/lo.png") } style={{float:"left",height:"50px",width:"50px"}} alt="hs"/>
                </div>
            </nav>
            {/* {image} */}
        </div>
        
        )
    }
}

export default Navbar;