import React from 'react';
import {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";


class cdashboard extends Component
{
  constructor(props){
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
        result : "",
        msg: []
    }
this.enablefields = this.enablefields.bind(this);
  
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
                rendermsg : ""

            });
            console.log('message from didmount: ', this.state.msg)
        });
}

enablefields=(props) =>
{
  props.disabled=false;
}

    render()
    {
     function editjobs()
     {
  this.state.rendermsg = <div>Hello REvz</div>
     }
    /*    return (
          <>
          <Card className="text-center" bg="primary">
  <Card.Header>WELCOME TO DASHBOARD</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
     
    </Card.Text>
    <Button  variant="primary">Post Job Openings</Button>
  </Card.Body>
  <Card.Footer className="text-muted">2 days ago</Card.Footer>
</Card>
<br></br>
          <Card bg="info" text="white" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>Primary Card Title</Card.Title>
              <Card.Text>
                Hello
              </Card.Text>
              <Button onClick={this.job} variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
          <br />
        
        
        
          <Card bg="danger" text="white" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
              
              </Card.Text>
              <Button variant="primary">EDIT Profile</Button>
            </Card.Body>
          </Card>
          <br />
        
        
          <Card bg="info" text="white" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>Info Card Title</Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        
          <Card bg="dark" text="white" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>Dark Card Title</Card.Title>
              <Card.Text>
      
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        
     
          <br />
        <div hidden="false">{this.job()}</div>
        </>      

          ); */



    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }     
  

      const element = <Welcome name="Sara" />;
    let details = this.state.msg.map(job => {
      return(
      
      
         
        <table align="center">
          <tbody>
           
            <tr><input type="text" placeholder={job.jobtitle} name="jobtitle" onChange = {this.jobtitlehandler} /></tr>
            <tr><input type="text" placeholder={job.posting} name="jobposting" onChange = {this.jobpostinghandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.applicationdeadline} name="applicationdeadline" onChange = {this.applicationdeadlinehandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.location} name="applicationdeadline" onChange = {this.locationhandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.salary} name="applicationdeadline" onChange = {this.salaryhandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.description} name="applicationdeadline" onChange = {this.description} disabled={this.state.disablefields}/></tr>

            <tr><input type="text" placeholder={job.jobcategory} name="applicationdeadline" onChange = {this.jobcategory} disabled={this.state.disablefields}/></tr>
            <button onClick={this.enablefields} class="btn btn-primary">Edit</button>               
         
         <button onClick={this.editjobs} class="btn btn-primary"> Add a new Job </button> 
           
          </tbody>
          </table>
      )
  });


        return(
        
        <div align="center" className="card">
     {this.state.rendermsg}
        <div className="row-fluid">
          <div className="span2">
          {details}
         </div>
          <div className="span10">
          </div>
        {element}
        </div>
      </div>  

        )
    }


    }


export default cdashboard;