import React from 'react';
import {Component} from 'react';
import {Card,CardGroup,Button} from "react-bootstrap";

import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Tabs} from 'react-bootstrap';


class dashboard extends Component
{
 
constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      
        msg: [],
        namevalue : "",
        dobvalue : "",
        cityvalue: "",
        statevalue:"",
        countryvalue:"",
        studentAllDetailsResult: [],
        studentAllEduDetailsResult: [],
        studentAllWorkDetailsResult: [],
        myJourney: [],
        yearofPassing: "",
        collegeName: "",
        degree: "",
        major: ""
    }

    this.namehandleChange = this.namehandleChange.bind(this);
    this.dobhandleChange = this.dobhandleChange.bind(this);
    this.cityhandleChange = this.cityhandleChange.bind(this);
    this.statehandleChange = this.statehandleChange.bind(this);
    this.countryhandleChange = this.countryhandleChange.bind(this);
  }

    namehandleChange(event) {
      this.setState({namevalue: event.target.value});
    }

    dobhandleChange(event) {
      this.setState({dobvalue: event.target.value});
    }

    cityhandleChange(event) {
      this.setState({cityvalue: event.target.value});
    }

    statehandleChange(event) {
      this.setState({statevalue: event.target.value});
    }

    countryhandleChange(event) {
      this.setState({countryvalue: event.target.value});
    }
  
    logout= ()=>{
      this.props.history.push('/student');
    }

    redirecttoUpdateProfilePage() {
      this.props.history.push("/Profile");
    }

    componentDidMount(){
      axios.get("http://localhost:3001/profile").then(response => {
        //update the state with the response data
        console.log("Details- ", response);
        this.setState({
          studentAllDetailsResult: this.state.studentAllDetailsResult.concat(
            response.data
          )
        });
        this.setState({
          myJourney: this.state.myJourney.concat(response.data)
        });
      });
      console.log("in componentDidMount");
      axios.get("http://localhost:3001/profileEduDetails").then(response => {
        //update the state with the response data
        console.log("Education- ", response);
        this.setState({
          studentAllEduDetailsResult: this.state.studentAllEduDetailsResult.concat(
            response.data
          )
        });
      });
      console.log("in componentDidMount");
      axios.get("http://localhost:3001/profileWorkDetails").then(response => {
        //update the state with the response data
        console.log("Work- ", response);
        this.setState({
          studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult.concat(
            response.data
          )
        });
      });
  }
    
    render()
    {
      var dis;
      
        dis=(
    <Card className="text-center" bg="primary">
        <Card.Header>WELCOME TO DASHBOARD</Card.Header>
        <Card.Body>
          <Card.Title> {sessionStorage.getItem('name')} </Card.Title>
          <Card.Text>
           
          </Card.Text>
          <Button variant="danger" onClick={this.logout}>Log Out!</Button>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
        <br></br>
      </Card>)

let studentDetails1 = this.state.studentAllDetailsResult.map(
  studentAllDetailResult => {
    console.log("Id is  " + studentAllDetailResult.studentDetailsId);
    return (
      <div>
        <form>
          <input
            class="editableinput2"
            type="text"
            placeholder={studentAllDetailResult.carrierObjective}
            onChange={this.handlemyJourneyChange}
          />
          <button
            class="editButton"
            onClick={event =>
              this.submitmyJourney(
                event,
                studentAllDetailResult.studentDetailsId,
                "carrierObjective"
              )
            }
          >
            Apply Changes
          </button>
        </form>
      </div>
    );
  }
);

  let studentWorkDetails = this.state.studentAllWorkDetailsResult.map(
    studentAllWorkDetailResult => {
      return (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "companyName"
                )
              }
              class="editableinput"
              name="companyName"
              placeholder={studentAllWorkDetailResult.companyName}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "title"
                )
              }
              class="editableinput"
              name="title"
              placeholder={studentAllWorkDetailResult.title}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "startDate"
                )
              }
              class="editableinput"
              name="startDate"
              placeholder={studentAllWorkDetailResult.startDate}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "endDate"
                )
              }
              class="editableinput"
              name="endDate"
              placeholder={studentAllWorkDetailResult.endDate}
            ></input>
            <button
              class="editButton"
              onClick={event =>
                this.submitWorkDetails(
                  event,
                  studentAllWorkDetailResult.workExpDetailsId
                )
              }
            >
              Apply Changes
            </button>
          </form>
        </div>
      );
    }
  );

  let studentEducationDetails = this.state.studentAllEduDetailsResult.map(
    studentAllEduDetailResult => {
      return (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "collegeName"
                )
              }
              name="collegeName" 
              class="editableinput3"
              type="text"
              placeholder={studentAllEduDetailResult.collegeName}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "degree"
                )
              }
              class="editableinput"
              name="degree"
              placeholder={studentAllEduDetailResult.degree}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "major"
                )
              }
              class="editableinput"
              name="major"
              placeholder={studentAllEduDetailResult.major}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "yearofPassing"
                )
              }
              class="editableinput"
              name="yearofPassing"
              placeholder={studentAllEduDetailResult.yearofPassing}
            ></input>

            <button
              class="editButton"
              onClick={event =>
                this.submitEduDetails(
                  event,
                  studentAllEduDetailResult.studentEduDetailsId
                )
              }
            >
              Apply Changes
            </button>
          </form>
        </div>
      );
    }
  );

        
     /*   return (
            <div class="container">
              <br></br>
              {studentDetails1}
           
          <br></br>
      
      </div>
          );*/

          return (
            <body>
              {dis}
              <button
                class="editButton"
                onClick={this.redirecttoUpdateProfilePage.bind(this)}
              >
                Go to Profile
              </button>
              <div class="row">
                <div class="leftcolumn">
                  <div class="card">
                    <h2>My Journey</h2>
                    {<p>{studentDetails1}</p>}
                  </div>
                  <br />
      
                  <h2 class="Profileheading">
                    Education
                    <button class="editButton">Add Education</button>
                  </h2>
      
                  {studentEducationDetails}
                  <br />
      
                  <h2 class="Profileheading">
                    Work Experience
                    <button class="editButton">Add Work</button>
                  </h2>
      
                  {studentWorkDetails}
                </div>
                
              </div>
      
              
            </body>
          );
    }
}

export default dashboard;