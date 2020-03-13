import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Popup from "reactjs-popup";


class Home extends Component {
    constructor(){
        super();
        this.state = {  
            jobs : [],
            savedapp : "",
            searchValue: "",
            jobStatus : ""
        }
        this.saveApplication = this.saveApplication.bind(this)
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:8080/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    jobs : (response.data) 
                });
            });
    }


    
    handleStatusChange(event)
    {
        this.setState({jobStatus: event.target.value});
    }


    handleOnChange(event)
    {
        this.setState({searchValue: event.target.value});

    }


    searchforprofile = (e) =>
    {
        const data = {
            jobStatus: this.state.jobStatus,
            searchValue: this.state.searchValue
          };
          console.log("Data is", data);
          axios
            .post(
              `http://localhost:8080/studentdatafilter`,
              data
            )
            .then(response => {
                console.log("response data",response.data);
                this.setState({
                    jobs : response.data
                });
                console.log("events",this.state.events);
                
            });
    }

    enableclick = () => 
    {
        this.saveEducationButton.innerHTML = 'Applied';

    }


    enablediv = () =>
    {
return (<h1>sss</h1>);
    }

    saveApplication(job_id){
        const data = {
         jobId : job_id,
         
        }

        axios.post('http://localhost:8080/saveApplication',data)
        .then(response => {
            console.log("data response : ",response.data);
            if(response.status === 200){
                console.log('Done');
                this.setState({
                    savedapp : "Applied"
                })
                
            }
            else{
                console.log('Error in saving application');
            }
        });

    }

    render(){
        
        //console.log(this.state.jobs)
        //iterate over books to create a table row
        let details = this.state.jobs.map(job => {
            return(
                <div className="row" key = {job.postion}>	
				<div className="well" style ={{height:'175px',width:'50%'}}>
						<h3>{job.postion}</h3>
                        <p> {job.job_desc}, {job.job_location} </p>
                        <p> {job.category} </p>
                        
                        <button  style = {{width :'50px',height:'30px'}} id="saveEducationButton" ref={ref => this.saveEducationButton = ref} value="Apply" onClick = {(e)=>this.saveApplication(job.job_id)}>Apply </button>
            <Popup trigger={<a style = {{float:'right', fontWeight:500}}> {job.company_name} </a>}
                         modal
                    closeOnDocumentClick>
            <div> {job.company_desc}  </div>
            <div> {job.email}  </div>
                </Popup>
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
            <div  align="center">
                
                             <img src ={require("../Util/what.jpg") } style={{float:"center",height:"200px",width:"1000px"}} alt="hs"/>
                             <br></br>

                 <select
              placeholder="Enter the Job Category"
              defaultValue=""
              class="editableinput10"
              name="jobStatus"
              onChange={e => this.handleStatusChange(e)}
            >
              <option value=""></option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Part Time">Part Time</option>
             
            </select>
          
            <br></br>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="Search for Job Title"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <br></br>
            <button style={{width:"200px"}} onClick={event =>
                  this.searchforprofile(
                    event
                  )}>Search</button>
                {redirectVar}
                <div className="container">
                    <h2>List of All jobs</h2>
                 <p style={{alignContent:"center",color:"red"}}>  {this.state.savedapp}  </p> 
                            <div>
                             {details}
                            </div>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;