import React,{ Component } from "react";
import axios from "axios";
import dateFormat from 'dateformat';
import Popup from "reactjs-popup";
import {Redirect} from 'react-router';


class CompanyDashboard extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        msg : [],
        successmsg : "",
        disablefields : true,
        companyname : "",
        authFlag: 0,
        studentnames : []
    }

    this.jobtitlehandler = this.jobtitlehandler.bind(this);
    this.postingdatehandler = this.postingdatehandler.bind(this);
    this.applicationdeadlinehandler = this.applicationdeadlinehandler.bind(this);
    this.locationhandler = this.locationhandler.bind(this);
    this.salaryhandler = this.salaryhandler.bind(this);
    this.jobdescriptionhandler = this.jobdescriptionhandler.bind(this);
    this.jobcategoryhandler = this.jobcategoryhandler.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.viewapplications = this.viewapplications.bind(this);
  
    } 


    jobdescriptionhandler(event)
    {
      this.setState({jobdescription: event.target.value});

    }

    jobtitlehandler(event) {
        this.setState({jobtitle: event.target.value});
      }

      jobcategoryhandler(event)
      {
        this.setState({jobcategory: event.target.value});
      }

      salaryhandler(event)
      {
        this.setState({salary: event.target.value});

      }


      postingdatehandler(event)
      {
        this.setState({posting: event.target.value});
      }


      applicationdeadlinehandler(event)
      {
        this.setState({applicationdeadline: event.target.value});

      }


      locationhandler(event)
      {
        this.setState({location : event.target.value});

      }
componentWillMount() {
    this.setState({
        msg: [],
        studentnames : []
    });
}


componentDidMount()
{
    axios.get('http://localhost:8080/displayjobdetails')
            .then((response) => {
                console.log("This is getting printed", response.data);
                const data = response.data["results"];
                console.log("data from console", data);
            //update the state with the response data
            this.setState({
                msg : data,
                companyname : sessionStorage.getItem("cname")
            });
            console.log('message from didmount: ', this.state.msg);
            console.log("companyname in axios",this.state.companyname);
        });
}

editjobs = (e) => {

}


enablefields = (props) => {
    console.log("in enable fields");
   
        props.disabled = false  
}

handleLoginClick() {
  this.setState({isLoggedIn: true});
}

handleLogoutClick() {
  this.setState({isLoggedIn: false});
}

submitnewjob = () => {
  const data = {
    jobtitle : this.state.jobtitle,
    posting:this.state.posting,
    applicationdeadline : this.state.applicationdeadline,
    location:this.state.location,
    salary:this.state.salary,
    jobdescription:this.state.jobdescription,
    jobcategory:this.state.jobcategory
    }
  axios.post("http://localhost:8080/submitnewjob", data).then(response => {
    console.log("Status Code : ", response.data);
    if(response.data === "success")
    {
    this.setState({
      authFlag : 1,
      successmsg: "Job insertion is successfull"
    })

    console.log("Job insertion is successfull");
    }
  });
};

submitmyJourney = (event, id, name) => {
  const data = {
    id: id,
    myJourney: this.state.myJourney
  };
  axios.post("http://localhost:8080/myjourney", data).then(response => {
    console.log("Status Code : ", response.status);
    if (response.status === 200) {
      console.log("Updated carrierObjective details successfully");
    } else {
      console.log("Error Updating carrierObjective page");
    }
  });
};




viewapplications = (e,jobid) =>
{
    // this.props.history.push('/viewapplications');
    sessionStorage.setItem("jobid",jobid);
    console.log("in view", jobid);
    this.setState({
        authFlag : 2
      })
    // redirectVar = <Redirect to="/viewapplications" />
}

render() {


    let rendermsg = null;
    rendermsg = this.state.msg;
    const isLoggedIn = this.state.isLoggedIn;
    var button;
    var signupform;
    var loginform;
    var msgstudent;
  
    var  redirectVar;

   if(this.state.authFlag == 2)
   {
           redirectVar = <Redirect to="/viewapplications" />

   }

  

   
    function AddnewPost(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <UserGreeting />;
      }
      return <GuestGreeting />;
    }

    function UserGreeting(props) {
      return <div></div>;
     }
      
      function GuestGreeting(props) {
        return <h1 align="center"> <h2>List of Job Postings</h2></h1>;
      }


      
    function LoginButton(props) {
      return (
        <div align="center" style ={{width:'50%'}}><button align="center" class="btn btn-primary" onClick={props.onClick}>
         <span>Add a New Job Posting</span>
        
        </button>   
        </div>         
      );
    }
    
    function LogoutButton(props) {
      return (
        <div align="center"><button onClick={props.onClick} class="btn btn-primary" style={{width:'50%'}}>
           Back to CompanyDashboard
                    </button></div>
      );
    }

      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
  


        if(this.state.authFlag === 1)
        {
        
          this.setState({isLoggedIn: false});

        }
       
        
       
        signupform = 
        (   
          <div class="container register-form">  
          {redirectVar}      
      <div>
          <div>
             <h3> Add a new Job Posting</h3>
          </div>

          <div class="form-content" align="center">
          
              <div class="form-group">
                 
                  <input type="text" size="50" class="form-control" onChange = {this.jobtitlehandler}  placeholder="Enter Job Title" name="jobtitle"  required/>
             
              </div>
              </div>
              <div class="form-content" align="center">
        
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.postingdatehandler}  placeholder="Enter Posting Date" name="posting"  required/>
              
              </div>
              </div>
              <div class="form-content" align="center">
          
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.applicationdeadlinehandler}  placeholder="Enter Application Deadline" name="applicationdeadline"  required/>
              
              </div>
              </div>
              <div class="form-content" align="center">
         
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.locationhandler}  placeholder="Enter Location" name="location"  required/>
             
              </div>
              </div>
              <div class="form-content" align="center">
          
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.salaryhandler}  placeholder="Enter Salary" name="salary"  required/>
              
              </div>
              </div>
              <div class="form-content" align="center">
          
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.jobdescriptionhandler}  placeholder="Enter Job Description" name="jobdescription"  required/>
             
              </div>

              <div class="form-content" align="center">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.jobcategoryhandler}  placeholder="Enter Job Category" name="jobcategory"  required/>
             
              </div>
              </div>

              </div>

              </div>
              <div>
                 <button
               class="btn btn-primary"
                onClick={this.submitnewjob}
              >Submit new JobPosting</button>
              </div>
              </div>
        );   
      }

      else {
        
        button = <LoginButton onClick={this.handleLoginClick} />;
       
        
            console.log("logged In inside console")
           
            const element = <Welcome name="Sara" />;

            

        loginform =  (  

   this.state.msg.map(job => {
          return(
            

            <div className="row" key =  {job.category}>	
            <div className="well" style ={{height:'175px',width:'50%'}}>
                    <h3>{job.postion}</h3>
                    <p> {job.job_desc}, {job.job_location} </p>
                    <button style ={{width:'30%'}} class="btn btn-primary" onClick={event =>
                  this.viewapplications(
                    event,
                    job.job_id
                  )}
>View Applications </button> 
                  
            </div>
            </div>


            
            
             
               
             
                    
          )
      }));
           
      }



    function Welcome(props) {
        return <h1 style={{textAlign:"center"}}>Welcome:- {props.name} </h1>;
      }     
  

   
          return (
            <div>
                {redirectVar}
              <Welcome name={this.state.companyname}/>
            <AddnewPost isLoggedIn={isLoggedIn} />
            <br></br>
            <img src ={require("../Util/tesla.png") } style={{float:"left",height:"300px",width:"300px",borderRadius:"50%",marginLeft:"50px"}} alt="hs"/>
            
            <div align="center">
             {button}
             <br></br>
           {signupform}
           {loginform}
            </div>
            </div> 
        );
    }

}

export default CompanyDashboard;