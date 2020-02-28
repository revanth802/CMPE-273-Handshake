import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import login from '../../js/actions/loginaction';
import { connect } from 'react-redux';


//Define a Login Component
class student extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
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
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        this.props.login(data);

        this.setState({
            username:this.state.username
        })
        //set the with credentials to true
     /*   axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                
                if(response.data == "fail1"){
                    this.setState({
                        authFlag : 1
                    })
                }
               else if(response.data=="fail2")
                {
                    this.setState({authFlag : 2})
                }
                else
            {
                console.log(response.data);
                    sessionStorage.setItem("name",response.data);
                    this.setState({
                        authFlag : 0
                    })
                }
                

            }); */
    }

    render(){
        console.log(this.state.authFlag);
        //redirect based on successful login
        var redirectVar = null;
  /*      if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        } */
   /*     if(this.state.authFlag===1)
        redirectVar=<p style={{color:"red",textAlign:"center"}}> USERNAME DOESNT EXIST </p>;

        else if(this.state.authFlag===2)
        redirectVar=<p style={{color:"red",textAlign:"center"}} > INVALID CREDENTIALS</p>
        
        else if(this.state.authFlag===0)
       { redirectVar=<Redirect to='/dashboard'/>
    //    sessionStorage.setItem("name","revanth");
    */

        var message=null;
        console.log('testLoad');
        
        let move = null;

        console.log(this.props) ;
        if(this.props.status){
        if(this.props.status == "fail1" )
            message= <p style={{atextAlign:"center",color:"red"}}>Incorrect credentials</p>;

        else if(this.props.status== 'fail2')
            message= <p style={{textAlign:"center", color:"red"}}>Incorrect password</p>;

        else if(this.props.status === "Successful login"){
        message = <Redirect to= "/dashboard"/>



        
        }
        console.log(this.props.status);   
        }

      /*  if(cookie.load('cookie')){
            console.log('testLoad');
            redirectVar = <Redirect to= "/dashboard"/> */
 
      console.log("message"+message);
        return(
            <div>
                {message}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Student Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>

                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button> 
                            <br></br> 
                            <br></br> 
                            <a href="/reg"> Signup</a>        

                    </div>
                </div>
            </div>
            </div>
            
        );
        }
    }

function mapStateToProps(state) {
    console.log(state.loginReducer)
    return {
     status: state.loginReducer.status
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (values) => dispatch(login(values))
    }
  }

  
export default connect(mapStateToProps, mapDispatchToProps)(student);
//export Login Component
//export default Login;
//export Login Component

