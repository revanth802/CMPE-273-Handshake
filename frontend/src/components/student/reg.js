import React, {Component} from 'react';
import axios from 'axios';


class reg extends Component
{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email: "",
            password : "",
            collegename:"",
            authFlag : false
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.collegenameChangeHandler = this.collegenameChangeHandler.bind(this);
        this.submitreg= this.submitreg.bind(this);
    }

    bl=()=>
    {
        this.props.history.push('/student');
    }
    
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : 0
        })
    }
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    
    collegenameChangeHandler = (e) => {
        this.setState({
            collegename : e.target.value
        })
    }

    submitreg = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            email:this.state.email,
            password : this.state.password,
            collegename:this.state.collegename

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/reg',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "success"){
                    this.setState({
                        authFlag : 1
                    })
                    console.log(this.state.authFlag);
                }
                
                if(response.data==="fail2")
                {
                    this.setState({authFlag : 2})
                }
                

            });
    }
    
    render()
    { 
        var red=null;
        if(this.state.authFlag==1)
       { red= <h1>Registration successfully</h1>;
    console.log("auth",this.state.authFlag); }

        return(
            <div style={{backgroundColor:"black"}}>
                <button bg="primary" onClick={this.bl} >Go Back</button> 
            <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p style={{color:"white"}}>Student Registration Form</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" placeholder="Student name *" name="name" />
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" placeholder="Emailid *" name="email" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" placeholder="Your Password *" name="password" />
                            </div>
                            <div class="form-group">
                                <input onChange = {this.collegenameChangeHandler} type="text" class="form-control" placeholder="College name *" name="collegename" />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.submitreg} type="button" class="btnSubmit" >Signup</button>
                </div>
            
            </div>
        </div>
        {red}
        </div>
        )
    }
}

export default reg;