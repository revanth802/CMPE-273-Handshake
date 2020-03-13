import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {backend}  from "../../config";

class Applications extends Component {
    constructor(){
        super();
        this.state = {  
            events : [],
            jobStatus : "",
            searchValue :""
        }
    }  

    handleStatusChange(event)
    {
        this.setState({jobStatus: event.target.value});
    }

    handleOnChange(event)
    {
        this.setState({searchValue: event.target.value});

    }

    searchforstatus = (e) =>
    {
        const data = {
            jobStatus: this.state.jobStatus,
            searchValue: this.state.searchValue
          };
          console.log("Data is", data);
          axios
            .post(
              `http://localhost:8080/studentjobsOnCategory`,
              data
            )
            .then(response => {
                console.log("response data",response.data);
                this.setState({
                    events : response.data
                });
                console.log("events",this.state.events);
                
            });
    }
    
    //get the books data from backend  
    componentDidMount(){
        axios.get(backend+'/showapplicationshome')
                .then((response) => {
                //update the state with the response data
                console.log("response data",response.data);
                this.setState({
                    events : response.data
                });
                console.log("events",this.state.events);
            });
    }

    render(){
        
        console.log(this.state.jobs)
        //iterate over books to create a table row
        let details = this.state.events.map(event => {
            return(
                <div className="row" key = {event.postion}>	
				<div className="well">
						<h3>{event.job_desc}</h3>
						<p> {event.job_location}, {event.job_long_desc} </p>
                        <p>{event.application_status}</p>
				</div>
		        </div>    
        )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div align="center">
                <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput10"
              name="jobStatus"
              onChange={e => this.handleStatusChange(e)}
            >
              <option value=""></option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Declined">Declined</option>
              <option value="Accepted">Accepted</option>
              <option value="Applied">Applied</option>
            </select>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Event Name / Location"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button style={{width:"200px"}} onClick={event =>
                  this.searchforstatus(
                    event
                  )}>Search</button>
            
                {redirectVar}
                <div className="container">
                    <h2> Applications</h2>
                        
                            <div>
                             {details}
                            </div>
                </div> 
            </div> 
        )
    }
}
export default Applications;