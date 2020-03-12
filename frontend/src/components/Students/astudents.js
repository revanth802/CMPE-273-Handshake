import React,{ Component } from "react";
import axios from "axios";
import dateFormat from 'dateformat';
import Popup from "reactjs-popup";
import Card from "react-bootstrap";
class StudentList extends Component
{

    constructor(props){
        super(props);
        this.state = {  
            studentnames : [],
            status : "",
            statustext: "",
            searchValue : " "
        }

        this.statushandler = this.statushandler.bind(this);
        this.updatethestatus = this.updatethestatus.bind(this);
    }

    handleOnChange(event)
    {
        this.setState({searchValue: event.target.value});

    }


    searchforskill = (e) =>
    {
        const data = {
            
            searchValue: this.state.searchValue
          };
          console.log("Data is", data);
          axios
            .post(
              `http://localhost:8080/searchforskill`,
              data
            )
            .then(response => {
                console.log("response data",response.data);
                this.setState({
                  studentnames : response.data
                });
                console.log("events",this.state.events);
                
            });
    }


    statushandler(event)
    {
       this.setState({
        status : event.target.value
       });
    }

    componentWillMount()
    {
      this.setState({
        statustext : ""
       });
    }

    componentDidMount()
    {
        var jobid = sessionStorage.getItem("jobid");
        console.log("showing jobid", jobid);
      console.log("inside view applications");
      const data = 
      {
    jobid : jobid
      }
      axios.get("http://localhost:8080/showstudentlist").then(response => {
        console.log("Status Code : ", response.status);
        console.log("inside the show application",response.data);
        if (response.status === 200) 
        {
            const data = response.data;
            this.setState({
                studentnames : data,
                
              })
              console.log("data is", data);

          console.log("Updated carrierObjective details successfully");
        }
        else 
        {
          console.log("Error Updating carrierObjective page");
        }
      });
      console.log("final student names",this.state.studentnames);
    }
    
    updatethestatus = (studentid) =>
    {
      console.log("inside update the status");
      var msg;
      const data = 
      {
    applicationstatus : this.state.status,
    studentid : studentid
      }

      this.setState({
        statustext : "Status Updated"
       });

      console.log("data",data);
      axios.post("http://localhost:8080/showstudentapplications", data).then(response => {
        console.log("Status Code : ", response.status);
        console.log("inside the update status",response.data);
        if (response.status === 200) 
        {
         
           msg = response.data;
           
          console.log("Updated application status successfully");
        }
         else 
        {
          console.log("Error Updating application status");
        }
      });
    }


render()
{
 
  var sessvariable;
    // sessvariable = sessionStorage.getItem("jobid");
    var msgstudent;
    msgstudent = (


        this.state.studentnames.map(student => {


                       return(
                        <div className="row" key = {student.student_id}>	
                        <div className="well" style ={{height:'175px',width:'50%'}}>
                    <h3>{student.first_name}, {student.last_name}</h3>
                                <p><span style = {{fontWeight:'bold'}}>Objective: </span>{student.objective}</p> 
                                <p> <span style = {{fontWeight:'bold'}}>Phone Number: </span>   {student.phone_no} </p>
                                <p> <span style = {{fontWeight:'bold'}}>Skills: {student.skills}</span> </p>
        
    <p>

                       <div style={{fontWeight: 500}}>{this.state.statustext}</div>
                
                       <Popup
      trigger={<button className="button" onClick={this.xy} style={{width:"25%"}}> View Profile </button>}
      position="center"
      closeOnDocumentClick
      >
      <table>
      <tr>
      <td>First name: {student.first_name}</td>
      </tr>
      <tr><td>Last name: {student.last_name}</td> </tr>
      <tr> <td>Email: {student.email}</td> </tr>
      <tr> <td>Phone number: {student.phone_no}</td> </tr>
      <tr><td>College name: {student.college_name}</td> </tr>
      <tr><td>DOB: {student.dob}</td> </tr>
      <tr><td>Education: {student.education}</td></tr>
      <tr><td>Objective: {student.objective}</td> </tr>
      <tr><td>City: {student.city}</td> </tr>
      </table>
      
      </Popup>
                                {/* <button  style = {{float :'right',width :'100px',height:'30px'}} onClick = {(e)=>this.viewProfile(student.student_id)}> View Profile</button> */}
                                </p>
                        </div>
                        </div>    
                )
        })
    )


  

    return(
      <div>
           
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Event Name / Location"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button style={{width:"200px"}} onClick={event =>
                  this.searchforskill(
                    event
                  )}>Search</button>
     <div align="center">
    <div>{msgstudent}</div>
    </div>
    </div>
    );
}
}

export default StudentList;