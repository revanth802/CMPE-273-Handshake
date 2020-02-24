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
        result : ""
    }
  
}

  componentWillMount()
  {

  }
    componentDidMount()
    {
   
    }

    job = () =>
    {
      console.log('clicked');
       return <p> hello rev</p>;
     
    }

    render()
    {
        return (
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

          );
    }
}

export default cdashboard;