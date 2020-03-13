import React,{ Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import {backend}  from "../../config";

class ViewEventApplications extends Component
{

    constructor(props){
        super(props);
        this.state = {  
            studentnames : [],
            status : "",
            statustext: ""
        }

        this.statushandler = this.statushandler.bind(this);
        this.updatethestatus = this.updatethestatus.bind(this);
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
        statustext : "Update the Status"
       });
    }

    componentDidMount()
    {
        var eventid = sessionStorage.getItem("eventid");
        console.log("showing jobid", eventid);
      console.log("inside view applications");
      const data = 
      {
    eventid : eventid
      }
      console.log("event id", eventid);
      axios.post(backend+"/showeventapplications", data).then(response => {
        console.log("Status Code : ", response.status);
        console.log("inside the show application",response.data);
        if (response.status === 200) 
        {
    
            const data = response.data["results"];
            this.setState({
                studentnames : data
              })
          console.log("Updated carrierObjective details successfully");
        } else 
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
      axios.post(backend+"/updateeventstatus", data).then(response => {
        console.log("Status Code : ", response.status);
        console.log("inside the update status",response.data);
        if (response.status === 200) 
        {
         
           msg = response.data;
           
          console.log("Updated application status successfully");
        } else 
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
                           <div>
                               <h3>List Of Student Applications</h3>
                        <div className="row" key = {student.student_id}>	
                        <div className="well" style ={{height:'175px',width:'80%'}}>
                    <h3>{student.first_name}, {student.last_name}</h3>
                                <p><span style = {{fontWeight:'bold'}}>Objective: </span>{student.objective}</p> 
                                <p> <span style = {{fontWeight:'bold'}}>Phone Number: </span>   {student.phone_no} </p>
                                          
    <p>
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
      <tr> <td>Skills: {student.skills}</td></tr>
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
                        </div>  
                )
        })
    )

    return(
     <div align="center">
    <div>{msgstudent}</div>
    </div>
    );
}
}

export default ViewEventApplications;