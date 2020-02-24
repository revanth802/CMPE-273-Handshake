import React, {Component} from 'react';
import axios from 'axios';


class creg extends Component
{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            cname : "",
            email: "",
            password : "",
            location:"",


            authFlag : false
        }
        //Bind the handlers to this class
        this.cnameChangeHandler = this.cnameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.submitcreg= this.submitcreg.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    cnameChangeHandler = (e) => {
        this.setState({
            cname : e.target.value
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
    
    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    submitcreg = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            cname : this.state.cname,
            email:this.state.email,
            password : this.state.password,
            location:this.state.location

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/creg',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "success"){
                    this.setState({
                        authFlag : true
                    })
                }
                if(response.data === "fail1"){
                    this.setState({
                        authFlag : 1
                    })
                }
                if(response.data==="fail2")
                {
                    this.setState({authFlag : 2})
                }
                

            });
    }
    
    render()
    {

        return(
            <div style={{backgroundColor:"black"}}>
            <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p style={{color:"white"}}>Company Registration Form</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input onChange = {this.cnameChangeHandler} type="text" class="form-control" placeholder="Company name *" name="cname" />
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
                                <input onChange = {this.locationChangeHandler} type="text" class="form-control" placeholder="Location *" name="location" />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.submitcreg} type="button" class="btnSubmit" >Signup</button>
                </div>
            </div>
        </div>
        </div>
        )
    }
}

export default creg;