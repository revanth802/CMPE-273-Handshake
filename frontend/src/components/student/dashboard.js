import React, { Component, useState } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card, CardColumns, Form, Col, Button } from "react-bootstrap";

var dateFormat = require('dateformat');



class dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: [],
      showEdit: false
    };
  }

  componentDidMount() {
    console.log('response');
    var emailID;
    var url = new URL(window.location.href);
    var search_params = new URLSearchParams(url.search);
    // this will be true
    if (search_params.has('emailId')) {
      emailID = search_params.get('emailId');
    } else {
      if (cookie.load('userName')) {
        emailID = cookie.load('userName');
      }
    }

    console.log(emailID);

    axios.get('http://localhost:3001/userDetails/') .then((response) => {
      //update the state with the response data
      console.log('response', response.data);
      this.setState({
        userDetails: response.data["results"]
      });
      this.setState(response.data["results"]); //Initial Values
    });
  }


  logout= ()=>{
    console.log('logging out')
    this.props.history.push('/student');
  }


  editForm = (e) => {
    this.setState({ showEdit: true });
  }

  updateForm = (e) => {
    this.setState({ showEdit: false });
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    var data;
    console.log('User Details',this.state.userDetails);
    console.log('User Details',this.state);

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    /*if(document.forms['createForm'].reportValidity()){
      const data = {
          bookId : this.state.bookId,
          bookTitle : this.state.bookTitle,
          bookAuthor : this.state.bookAuthor
      }*/
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    var data;
    axios.post('http://localhost:3001/create', data)
      .then(response => {
        if (response.data === 'Error') {
          this.setState({ showUniqueError: true });
        } else {
          this.setState({ redirectToHome: true });
        }
        console.log("Status Code : ", response.data);
      })
      .catch(errors => {
        console.log('Error' + errors);
      });
  }
 



  render() {
    var dis,dashboard;
      
        dis=(
    <Card className="text-center" bg="primary" >
        <Card.Header>WELCOME TO DASHBOARD</Card.Header>
        <Card.Body>
          <Card.Title> <h1>{sessionStorage.getItem("name")}</h1></Card.Title>
          <Card.Text>
           
          </Card.Text>
          <button onClick={this.editForm} class="btn btn-success" >Edit</button>
          <Button variant="danger" onClick={this.logout}>Log Out!</Button>
          
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
        <br></br>
      </Card>)

    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to="/login" />
    }
    // var userDetails = this.state.userDetails;
    var showEdit = this.state.showEdit;

    let message1 = null;
        let message2 = null;
    console.log(this.state.userDetails);
    dashboard = this.state.userDetails.map(userDetails => {
    return (
      <div>
        {dis}
        {showEdit !== undefined && !showEdit &&
          <div>
            {message1}
            {message2}
            <CardColumns>
              <Card bg="secondary">
           
                <Card.Body>
                  <Card.Title>Name : {userDetails.name}</Card.Title>
                  <Card.Text>Email Id : {userDetails.emailID}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Career Objective</Card.Header>
                <Card.Body>
                  <Card.Title>{userDetails.careerObjective}</Card.Title>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Personal Details</Card.Header>
                <Card.Body>
                  <Card.Text>DOB : {userDetails.dob}</Card.Text>
                  <Card.Text>Contact No : {userDetails.contactNo}</Card.Text>
                  <Card.Text>City : {userDetails.city}</Card.Text>
                  <Card.Text>State : {userDetails.state}</Card.Text>
                  <Card.Text>Country : {userDetails.country}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Education</Card.Header>
                <Card.Body>
                  <Card.Text>College Name : {userDetails.collegeName}</Card.Text>
                  <Card.Text>Degree : {userDetails.degree}</Card.Text>
                  <Card.Text>Major : {userDetails.major}</Card.Text>
                  <Card.Text>Year of Passing : {userDetails.yearOfPassing}</Card.Text>
                  <Card.Text>Current CGPA : {userDetails.currentCGPA}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Experience</Card.Header>
                <Card.Body>
                  <Card.Text>Company Name : {userDetails.expCompanyName}</Card.Text>
                  <Card.Text>Company Title : {userDetails.expCompanyTitle}</Card.Text>
                  <Card.Text>Location : {userDetails.expLocation}</Card.Text>
                  <Card.Text>Start Date : {userDetails.expStartDate}</Card.Text>
                  <Card.Text>End Date : {userDetails.expEndDate}</Card.Text>
                  <Card.Text>Description : {userDetails.expDescription}</Card.Text>
                  <Card.Text>Skillset : {userDetails.skillset}</Card.Text>
                </Card.Body>
              </Card>
            </CardColumns>
         
          </div>
        }

        {showEdit !== undefined && showEdit &&
          <div>
            
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={userDetails.name}
                  onChange={this.handleChange}
                  name="name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email Id"
                  defaultValue={userDetails.emailID}
                  onChange={this.handleChange}
                  name="emailID"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Contact No"
                  defaultValue={userDetails.contactNo}
                  onChange={this.handleChange}
                  name="contactNo"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" onChange={this.handleChange}
                  name="dob" defaultValue={dateFormat(userDetails.dob,"yyyy-mm-dd")} placeholder="Date of Birth" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="city" defaultValue={userDetails.city} placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="state" defaultValue={userDetails.state} placeholder="State" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom06">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="country" defaultValue={userDetails.country} placeholder="Country" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>College Name</Form.Label>
                <Form.Control onChange={this.handleChange}
                  name="collegeName" type="text" defaultValue={userDetails.collegeName} placeholder="College Name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Career Objective</Form.Label>
                <Form.Control onChange={this.handleChange}
                  name="careerObjective" type="text" defaultValue={userDetails.careerObjective} placeholder="Career Objective" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Degree</Form.Label>
                <Form.Control  onChange={this.handleChange}
                  name="degree" type="text" defaultValue={userDetails.degree} placeholder="Degree" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Major</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="major" defaultValue={userDetails.major} placeholder="Major" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Year Of Passing</Form.Label>
                <Form.Control type="date"onChange={this.handleChange}
                  name="dateOfPassing" defaultValue={dateFormat(userDetails.dateOfPassing,"yyyy-mm-dd")} placeholder="Year Of Passing" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Current CGPA</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="currentCGPA" defaultValue={userDetails.currentCGPA} placeholder="Current CGPA" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="expCompanyName" defaultValue={userDetails.expCompanyName} placeholder="Company Name" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Company Title</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="expCompanyTitle" defaultValue={userDetails.expCompanyTitle} placeholder="Company Title" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" onChange={this.handleChange}
                  name="expLocation" defaultValue={userDetails.expLocation} placeholder="Location" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" onChange={this.handleChange}
                  name="expStartDate" defaultValue={dateFormat(userDetails.expStartDate,"yyyy-mm-dd")} placeholder="Start Date" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" onChange={this.handleChange}
                  name="expEndDate" defaultValue={dateFormat(userDetails.expEndDate,"yyyy-mm-dd")} placeholder="End Date" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Job Description</Form.Label>
                <Form.Control onChange={this.handleChange}
                  name="expDescription" type="text" defaultValue={userDetails.expDescription} placeholder="Job Description" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom06">
                <Form.Label>Skill Set</Form.Label>
                <Form.Control onChange={this.handleChange}
                  name="skillset" type="text" defaultValue={userDetails.skillset} placeholder="Skill Set" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
          </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
<br></br>
            
            <Button onClick={this.updateForm}>Update Details</Button>

          </div>
        }
      </div>
    );
      });
      return <div>{dashboard}</div>
    
  }

}


export default dashboard;