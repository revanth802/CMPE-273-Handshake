// import React,{ Component } from "react";
// import axios from "axios";
// import dateFormat from 'dateformat';
// import Popup from "reactjs-popup";


// class CompanyDashboard extends Component
// {
//     constructor(props)
//     {

//         super(props);
//         this.state = 
//     {
//         msg : [],
//         disablefields : true,
//         companyname : "",
//         authFlag: 0,
//         studentnames : []
//     }

//     this.jobtitlehandler = this.jobtitlehandler.bind(this);
//     this.postingdatehandler = this.postingdatehandler.bind(this);
//     this.applicationdeadlinehandler = this.applicationdeadlinehandler.bind(this);
//     this.locationhandler = this.locationhandler.bind(this);
//     this.salaryhandler = this.salaryhandler.bind(this);
//     this.jobdescriptionhandler = this.jobdescriptionhandler.bind(this);
//     this.jobcategoryhandler = this.jobcategoryhandler.bind(this);
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//     } 


//     jobdescriptionhandler(event)
//     {
//       this.setState({jobdescription: event.target.value});

//     }

//     jobtitlehandler(event) {
//         this.setState({jobtitle: event.target.value});
//       }

//       jobcategoryhandler(event)
//       {
//         this.setState({jobcategory: event.target.value});
//       }

//       salaryhandler(event)
//       {
//         this.setState({salary: event.target.value});

//       }


//       postingdatehandler(event)
//       {
//         this.setState({posting: event.target.value});
//       }


//       applicationdeadlinehandler(event)
//       {
//         this.setState({applicationdeadline: event.target.value});

//       }


//       locationhandler(event)
//       {
//         this.setState({location : event.target.value});

//       }
// componentWillMount() {
//     this.setState({
//         msg: [],
//         studentnames : []
//     });
// }


// componentDidMount()
// {
//     axios.get('http://localhost:8080/displayjobdetails')
//             .then((response) => {
//                 console.log("This is getting printed", response.data);
//                 const data = response.data["results"];
//                 console.log("data from console", data);
//             //update the state with the response data
//             this.setState({
//                 msg : data,
//                 companyname : sessionStorage.getItem("companyname")
//             });
//             console.log('message from didmount: ', this.state.msg);
//             console.log("companyname in axios",this.state.companyname);
//         });
// }

// editjobs = (e) => {

// }


// enablefields = (props) => {
//     console.log("in enable fields");
   
//         props.disabled = false  
// }

// handleLoginClick() {
//   this.setState({isLoggedIn: true});
// }

// handleLogoutClick() {
//   this.setState({isLoggedIn: false});
// }

// submitnewjob = () => {
//   const data = {
//     jobtitle : this.state.jobtitle,
//     posting:this.state.posting,
//     applicationdeadline : this.state.applicationdeadline,
//     location:this.state.location,
//     salary:this.state.salary,
//     jobdescription:this.state.jobdescription,
//     jobcategory:this.state.jobcategory
//     }
//   axios.post("http://localhost:8080/submitnewjob", data).then(response => {
//     console.log("Status Code : ", response.data);
//     if(response.data === "success")
//     {
//     this.setState({
//       authFlag : 1
//     })
//     }
//   });
// };

// submitmyJourney = (event, id, name) => {
//   const data = {
//     id: id,
//     myJourney: this.state.myJourney
//   };
//   axios.post("http://localhost:8080/myjourney", data).then(response => {
//     console.log("Status Code : ", response.status);
//     if (response.status === 200) {
//       console.log("Updated carrierObjective details successfully");
//     } else {
//       console.log("Error Updating carrierObjective page");
//     }
//   });
// };


//  viewapplications = (e,jobid) =>
// {
//     console.log("showing jobid", jobid);
//   console.log("inside view applications");
//   const data = 
//   {
// jobid : jobid
//   }
//   axios.post("http://localhost:8080/showapplication", data).then(response => {
//     console.log("Status Code : ", response.status);
//     console.log("inside the show application",response.data);
//     if (response.status === 200) 
//     {

//         const data = response.data["results"];
//         this.setState({
//             studentnames : data
//           })
//       console.log("Updated carrierObjective details successfully");
//     } else 
//     {
//       console.log("Error Updating carrierObjective page");
//     }
//   });
//   console.log("final student names",this.state.studentnames);
// }

// render() {


//     let rendermsg = null;
//     rendermsg = this.state.msg;
//     const isLoggedIn = this.state.isLoggedIn;
//     var button;
//     var signupform;
//     var loginform;
//     var msgstudent;
//     let redirectVar = null;

//     msgstudent = (

//         this.state.studentnames.map(job => {
//             return(
                
//                 <div className="card">
                 
//                <table align="center">
//                  <tbody>
                  
//                    <tr>
//                      <td> {job.first_name} + {job.first_name}</td>
//                       </tr>
                      
//                    </tbody>
//                    </table>
//                    </div>
//                        );
//         })
//     )

   
//     function AddnewPost(props) {
//       const isLoggedIn = props.isLoggedIn;
//       if (isLoggedIn) {
//         return <UserGreeting />;
//       }
//       return <GuestGreeting />;
//     }

//     function UserGreeting(props) {
//       return <div></div>;
//      }
      
//       function GuestGreeting(props) {
//         return <h1 align="center"> <h2>List of Job Postings</h2></h1>;
//       }


      
//     function LoginButton(props) {
//       return (
//         <div align="center"><button align="center"  style={{marginLeft : "230px"}} class="btn btn-primary" onClick={props.onClick}>
//          <span>Add a New Job Posting</span>
//          <br></br>
//         </button>   
//         </div>         
//       );
//     }
    
//     function LogoutButton(props) {
//       return (
//         <button onClick={props.onClick} class="btn btn-primary">
//           Back to CompanyDashboard
//                     </button>
//       );
//     }

//       if (isLoggedIn) {
//         button = <LogoutButton onClick={this.handleLogoutClick} />;
  
        
       
//         signupform = 
//         (   
//           <div class="container register-form">        
//       <div class="form">
//           <div class="note">
//               <h2>Add a new Job Posting</h2>
//           </div>

//           <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.jobtitlehandler}  placeholder="Enter Job Title" name="jobtitle"  required/>
//               </div>
//               </div>
//               </div>
//               </div>
//               <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.postingdatehandler}  placeholder="Enter Posting Date" name="posting"  required/>
//               </div>
//               </div>
//               </div>
//               </div>
//               <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.applicationdeadlinehandler}  placeholder="Enter Application Deadline" name="applicationdeadline"  required/>
//               </div>
//               </div>
//               </div>
//               </div>
//               <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.locationhandler}  placeholder="Enter Location" name="location"  required/>
//               </div>
//               </div>
//               </div>
//               </div>
//               <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.salaryhandler}  placeholder="Enter Salary" name="salary"  required/>
//               </div>
//               </div>
//               </div>
//               </div>
//               <div class="form-content" align="center">
//           <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.jobdescriptionhandler}  placeholder="Enter Job Description" name="jobdescription"  required/>
//               </div>
//               </div>
//               </div>

//               <div class="row">
//           <div class="col-md-6">
//               <div class="form-group">
                 
//                   <input type="text" class="form-control" onChange = {this.jobcategoryhandler}  placeholder="Enter Job Category" name="jobcategory"  required/>
//               </div>
//               </div>
//               </div>

//               </div>

//               </div>
//               <div>
//                  <button
//                class="btn btn-primary"
//                 onClick={this.submitnewjob}
//               >Submit new JobPosting</button>
//               </div>
//               </div>
//         );   
//       }

//       else {
        
//         button = <LoginButton onClick={this.handleLoginClick} />;
       
        
//             console.log("logged In inside console")
           
//             const element = <Welcome name="Sara" />;

            

//         loginform =  (  

//    this.state.msg.map(job => {
//           return(
            
//              <div className="card">
//               {msgstudent}
//             <table align="center">
//               <tbody>
               
//                 <tr>
//                   <td>Title : {job.category}</td>
//                    </tr>
//                 <tr>
                  
//                   <td>Posting Date : {job.position}</td></tr>
//                 <tr>
                 
//                   <td>Application Deadline : {job.job_desc}</td></tr>
//                 <tr>
                  
//                   <td>Location : {job.job_location}</td></tr>
//                 <tr>
                 
//                   <td> Salary : {job.job_long_desc} </td></tr>
               
                  
//                   <tr>
//                       <td>     
//              <button class="btn btn-primary" onClick={event =>
//                   this.viewapplications(
//                     event,
//                     job.job_id
//                   )
//                 }> View Applications </button> 
                

//              </td>  
//               {/* <Popup  trigger={<a style = {{float:'right'}}> Show Description </a>}
//                          modal
//                     closeOnDocumentClick>
//             <div> {this.viewapplications(
//                     job.job_id
//                   )} </div>
//                 </Popup> */}
//              </tr>
//               </tbody>
//               </table>
//               <table>
//                 <tbody>
//           <tr></tr>
//                 </tbody>
//               </table>
//               </div>
                    
//           )
//       }));
           
//       }



//     function Welcome(props) {
//         return <h1>Hello, {props.name} </h1>;
//       }     
  

   
//           return (
//             <div>
//               <Welcome name={this.state.companyname}/>
//             <AddnewPost isLoggedIn={isLoggedIn} />
          
//             <div align="center">
//              {button}
//              <br></br>
//            {signupform}
//            {loginform}
//             </div>
//             </div> 
//         );
//     }

// }

// export default CompanyDashboard;