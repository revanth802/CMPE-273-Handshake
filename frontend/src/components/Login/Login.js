import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {auth} from '../../ReduxModules/actions/index';
import {connect} from 'react-redux';
import {backend}  from "../../config";

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            msg: "",
            errmsg : ""
        }
        //Bind the handlers to this className
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            msg : "abc"
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
     async  submitLogin(e) {
       // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
       var   loginData = await this.props?.auth(data);
        console.log(this.props, loginData);
        console.log(this.props?.loginData[0].data);
                  
                    if((this.props?.loginData[0].data) === "Incorrect Username and/or Password!"){
                        console.log("inside student");
                        this.setState({
                            msg : "student",
                            authFlag :true,
                            errmsg : "Incorrect Username and/or Password!"
                        })
                    }
                    else
                    {
                        this.setState({
                            msg : "company",
                            authFlag: false
                        })
                    }
                console.log("inside function",this.state.msg);
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        console.log("message is",this.state.msg);
        if(cookie.load('cookie')){
           
            redirectVar = <Redirect to= "/home"/>
           
        }
        return(
            <div>
                  <img src ={require("../Util/bg.jpg") } style={{float:"left",height:"600px",width:"700px"}} alt="hs"/>
                {redirectVar}
            <div className="container" style ={{marginTop:100}} >
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Student Signin</h2>
                        </div>
                        
                            <div className="form-group">
                                <p>Username: </p>
                                <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <p>Password: </p>
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginData : state.login.loginData,
      });

export default connect (mapStateToProps,{auth})(Login);