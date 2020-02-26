import React from 'react';
import {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Button from 'react-bootstrap/Button';
import dateFormat from 'dateformat';
import {Card,CardDeck} from "react-bootstrap";



class cdashboard extends Component
{
  constructor(props){
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
        result : "",
        msg: [],
        isloggedin: false
    }  

    this.loginhandler = this.loginhandler.bind(this);
    this.logouthandler = this.logouthandler.bind(this);
    this.jobtitleChangeHandler=this.jobtitleChangeHandler.bind(this);
    this.postingChangeHandler=this.postingChangeHandler.bind(this);
    this.applicationdeadlineChangeHandler= this.applicationdeadlineChangeHandler.bind(this);
    this.locationChangeHandler=this.locationChangeHandler.bind(this);
    this.salaryChangeHandler=this.salaryChangeHandler.bind(this);
    this.jobdescriptionChangeHandler=this.jobdescriptionChangeHandler.bind(this);
    this.jobcategoryChangeHandler=this.jobcategoryChangeHandler.bind(this);

}

jobtitleChangeHandler = (e) => {
  this.setState({
      jobtitle : e.target.value
  })
}
postingChangeHandler = (e) => {
  this.setState({
      posting : e.target.value
  })
}
applicationdeadlineChangeHandler = (e) => {
  this.setState({
      applicationdeadline : e.target.value
  })
}
locationChangeHandler = (e) => {
  this.setState({
      location : e.target.value
  })
}
salaryChangeHandler = (e) => {
  this.setState({
      salary : e.target.value
  })
}
jobdescriptionChangeHandler = (e) => {
  this.setState({
      jobdescription : e.target.value
  })
}
jobcategoryChangeHandler = (e) => {
  this.setState({
      jobcategory : e.target.value
  })
}
loginhandler()
{
this.setState({
  isloggedin : true
})
}

logouthandler()
{
this.setState({
  isloggedin : false
})
}

  componentWillMount()
  {

  }
  componentDidMount(){
    axios.get('http://localhost:3001/displayjobdetails')
            .then((response) => {
                console.log("This is getting printed", response.data);
                const data = response.data["results"];
                console.log("data from console", data);
            //update the state with the response data
            this.setState({
                msg : data,
                rendermsg : "",
                isloggedin : true

            });
            console.log('message from didmount: ', this.state.msg)
        });
}

submitLogin = (e) => {
  var headers = new Headers();
  //prevent page from refresh
  e.preventDefault();
  const data = {
      jobtitle : this.state.jobtitle,
      posting : this.state.posting,
      applicationdeadline:this.state.applicationdeadline,
      location:this.state.location,
      salary:this.state.salary,
      jobdescription:this.state.jobdescription,
      jobcategory:this.state.jobcategory
  }
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post('http://localhost:3001/cjob',data)
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
      var addnewjob;
      var dashboard;
      var button,dis;
 
          function AddnewJobButton(props)
          {

            return <Button onClick={props.onClick}>Add a new Job</Button>
          }

          function Dashboardbutton(props)
          {

            return  <button onClick={props.onClick} class="btn btn-primary">back to Dashboard</button> 
          }

      const isloggedin=this.state.isloggedin;
  if(isloggedin)
  { dis=(
    <Card className="text-center" bg="primary">
        <Card.Header>WELCOME TO DASHBOARD</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
           
          </Card.Text>
          <Button variant="danger">Post Job Openings</Button>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
        <br></br>
      </Card>)
    button = <AddnewJobButton onClick={this.logouthandler}/> 

     dashboard = this.state.msg.map(job => {
      return(
        <div align="center">
        
        <Card align="center" className="text-center" bg="info" text="white"   style={{ width: '30rem' }}>
        <table >
          <tbody>
           <br></br>
            <tr><td>Title : {job.jobtitle}  </td></tr>
            <tr><td>Posting : {dateFormat(job.posting, "mmmm dS, yyyy")}</td> </tr>
            <tr><td>Deadline : {dateFormat(job.applicationdeadline, "mmmm dS, yyyy")}</td></tr>
            <tr><td>Location : {job.location}</td></tr>
            <tr><td>Salary : {job.salary}</td></tr>
            <tr><td>Description :  {job.description} </td></tr>            
           
          </tbody>
          </table>
          <br></br>
          </Card>
          <br></br>
          </div>
          
      )
   
  });
}

else
{ button = <Dashboardbutton bg="secondary" onClick={this.loginhandler}/> 
   addnewjob= 
  
      <div class="container">
                
      <div class="login-form">
          <div class="main-div">
              <div class="panel">
                  <h2>Add a new job</h2>
              </div>
              
                  <div class="form-group">
                      <input onChange = {this.jobtitleChangeHandler} type="text" class="form-control" name="jobtitle" placeholder="Job title"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.postingChangeHandler} type="text" class="form-control" name="posting" placeholder="Posting"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.applicationdeadlineChangeHandler} type="text" class="form-control" name="applicationdeadline" placeholder="Application deadline"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="location"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.salaryChangeHandler} type="text" class="form-control" name="salary" placeholder="Salary"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.jobdescriptionChangeHandler} type="text" class="form-control" name="jobdescription" placeholder="Job Description"/>
                  </div>
                  <div class="form-group">
                      <input onChange = {this.jobcategoryChangeHandler} type="text" class="form-control" name="jobcategory" placeholder="Job category"/>
                  </div>

                  <button onClick = {this.submitLogin} class="btn btn-primary">Post Job!</button>      
                  <br/>
                  <br/>            
          </div>
      </div>
  </div>
}
        return(
         
        <div align="center" className="card">
    <div></div>
        <div className="row-fluid">
       {dis}
       <br></br>
          <div className="span2">
            <CardDeck>
          {dashboard}
          </CardDeck>
         </div>
          <div className="span10">
          </div>
        </div>
        <br></br>
        {addnewjob}
        {button}
      </div>  

        )
    }


    }


export default cdashboard;