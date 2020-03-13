import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {backend}  from "../../config";



class CompanyLogin extends Component {
    constructor(props) {
      super(props);
  
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
      this.state = {
        isLoggedIn: false,
        company :"",
        emailid : "",
        password : "",
        username : "",
        authFlag : false,
        companyname : "",
        cname: "",
        errmsg : "",
        msg : []
      }    
    }
    usernameChangeHandler = (e) => {
                this.setState({
                    username : e.target.value
                })
            }

    passwordChangeHandler = (e) => {
                this.setState({
                    password : e.target.value
                })
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        console.log("data from axios", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(backend+'/auth',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                const data = response.data["results"];
                console.log("response data from axios", response.data);
           
            if(response.status === 200)
            {
               
                if(response.data === "Incorrect Username and/or Password!"){
                    this.setState({
                        authFlag : false,
                        errmsg : "Incorrect Username and/or Password!"
                          
                    })

                }
                else{
                    this.setState({
                        authFlag : true,
                        cname : data[0].company_name
                                               
                    })
                    sessionStorage.setItem("companyname",data[0].company_id);
                    sessionStorage.setItem("cname",data[0].company_name);

                    console.log("in response data credentials", data[0].company_name);
                }
            }
            });
    }



    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      var button;
      var signupform;
      var loginform;
      var rendermsg;
      let redirectVar = null;
      if(cookie.load('cookie')){
           
        redirectVar = <Redirect to= "/companydashboard"/>
       
    }

      function UserGreeting(props) {
      return <div></div>;
     }
      
      function GuestGreeting(props) {
        return <h1 align="center"></h1>;
      }

      
          
     
           
        
        loginform =  (<div class="container">
              
                  <div class="login-form">
                         <div class="main-div">
                              <div class="panel">
                                   <h2>Company Login</h2>
                                   <p>Please enter your username and password</p>
                                </div>
                                
                                 <div>
                                       <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                  </div>
                                  <br></br>
                                   <div>
                                     <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                   </div>
                                   <br></br>
                                  <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>        
                          </div>
                       </div>
        
                   </div>);
      
  
          

      return (
        <div>
          <img src ={require("../Util/bg2.jpg") } style={{float:"left",height:"600px",width:"700px"}} alt="hs"/>
            {redirectVar}
        <div align="center">
             <span style={{color: 'red' , fontWeight : 500}}>{this.state.errmsg}</span>
         
         
          {loginform}
        </div>
        
        </div>  
      );
    }
  }
  

export default CompanyLogin;