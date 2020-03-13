import React,{ Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router';


class Events extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        msg : [],
        disablefields : true,
        eventname : "",
        authFlag: 0,
        studentnames : [],
        events : [],
        eventdescription : "",
        eventtime : "",
        location : "",
        carlist : "",
        authFlag :0,
        companyname : "",
        successmsg : "",
        searchValue :""
        
    }

    this.eventnamehandler = this.eventnamehandler.bind(this);
    this.eventdescriptionhandler = this.eventdescriptionhandler.bind(this);
    this.eventtimehandler = this.eventtimehandler.bind(this);
    this.locationhandler = this.locationhandler.bind(this);
    this.eligibilty = this.eligibilty.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.viewapplications = this.viewapplications.bind(this);
 
  
    } 


    eventnamehandler(event)
    {
      this.setState({eventname: event.target.value});

    }

    eventdescriptionhandler(event) {
        this.setState({eventdescription: event.target.value});
      }

      eventtimehandler(event)
      {
        this.setState({eventtime: event.target.value});
      }

      locationhandler(event)
      {
        this.setState({location: event.target.value});

      }


      eligibilty(event)
      {
        this.setState({carlist: event.target.value});
      }


     
componentWillMount() {
    this.setState({
        events: []
    });
}


componentDidMount()
{
  
        axios.get('http://localhost:8080/events')
                .then((response) => {
                    console.log("in events");
                    console.log(response.data);
                    
                //update the state with the response data
                this.setState({
                    events : this.state.events.concat(response.data),
                    companyname :  sessionStorage.getItem("cname"),
                });
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

submitnewevent = () => {
  const data = {
    eventname : this.state.eventname,
    eventdescription:this.state.eventdescription,
    eventtime : this.state.eventtime,
    location:this.state.location,
    eligibility:this.state.carlist,
 
    }
  axios.post("http://localhost:8080/submitnewevent", data).then(response => {
    console.log("data is : ", response.data);
    if(response.data === "success")
    {
    this.setState({
      authFlag : 1,
      successmsg : "Event Successfully created"

    })
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


searchstring = (e) =>
    {
        const data = {
            searchValue: this.state.searchValue
          };
          console.log("Data is", data);
          axios
            .post(
              `http://localhost:8080/filterevents`,
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


register = (eventid) =>
{

    const data = {
        eventid : eventid
    }
    console.log("in event", eventid)
    axios.post("http://localhost:8080/applyreg", data).then(response => {
    console.log("applyreg",response.data);
});
        console.log("registered");
}


vieweventapplications = (e,eventid) =>
{

  sessionStorage.setItem("eventid",eventid);
  console.log("in view", eventid);
  this.setState({
      authFlag : 2
    })
}

  
render() {


    let rendermsg =  this.state.msg;
    const isLoggedIn = this.state.isLoggedIn;
    var button;
    var signupform;
    var loginform;
    
  
    var  redirectVar;

   if(this.state.authFlag === 2)
   {
           redirectVar = <Redirect to="/vieweventapplications" />

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
        return <h1 align="center"> <h2>List of Events</h2></h1>;
      }


      
    function LoginButton(props) {
      return (
        <div  style ={{width:'50%'}}>
          <button align="center" class="btn btn-primary" onClick={props.onClick}>
       Post New Event
        </button>

         
        </div>         
      );
    }
    
    function LogoutButton(props) {
      return (
        <button style = {{ width : "50%"}} onClick={props.onClick} class="btn btn-primary">
          Back to List of Events
                    </button>
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
        <div><h2>{this.state.successmsg}</h2></div>

      <div class="form">
          <div class="note">
              <h2>Post New Event</h2>
          </div>

          <div class="form-content" align="center">
        
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.eventnamehandler}  placeholder="Enter Event Name" name="eventname"  required/>
              </div>
              </div>
             
              <div class="form-content" align="center">
    
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.eventdescriptionhandler}  placeholder="Enter Event Description" name="eventdescription"  required/>
              </div>
             
              </div>
              <div class="form-content" align="center">
         
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.eventtimehandler}  placeholder="Enter Event Time" name="eventtime"  required/>
             
              </div>
              </div>
              <div class="form-content" align="center">
         
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.locationhandler}  placeholder="Enter Location" name="location"  required/>
            
              </div>
              </div>
              {/* <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="select" class="form-control" onChange = {this.eligibilty}  placeholder="Enter Eligibility" name="eligibility"  required/>
              </div>
              </div>
              </div>
              </div> */}

              <div class="form-content" align="center">
   
              <div class="form-group">
                 
              <label for="cars">Choose the Eligibility:</label>
    <select onChange = {this.eligibilty} id="cars" name="carlist" form="carform">
    <option value="All">ALL</option>
    <option value="SE">SE Graduates</option>
    <option value="EE">EE Graduates</option>
    <option value="CE">CE Graduates</option>
    </select>              
              
              </div>
              </div>

            </div>
              <div>
                 <button
               class="btn btn-primary"
                onClick={this.submitnewevent}
              >Submit new JobPosting</button>
              </div>
              </div>
        );   
      }

      else {
        
        button = <LoginButton onClick={this.handleLoginClick} />;
       
        
            console.log("logged In inside console")
           
            

            
        loginform =  (  

   this.state.events.map(event => {
    return(
      <div>
        {redirectVar}
        <div className="row" key = {event.event_name}>	
        <div className="well" style ={{height:'175px',width:'50%'}}>
            <h3>{event.event_name}</h3>
                <h4>{event.event_desc}</h4>
                <p> {event.event_time}, {event.location} </p>
                <button onClick={e =>
                  this.vieweventapplications(
                    e,
                    event.event_id
                  )} style = {{align :'right' , width : "50%" }}> View Applications</button>
               
        </div>
        </div> 
        </div>   
)
      }));
           
      }



    function Welcome(props) {
        return <h1>Hello, {props.name} </h1>;
      }     
  

   
          return (
            <div>
                {redirectVar}
              {/* <Welcome name={this.state.companyname}/> */}
            <AddnewPost isLoggedIn={isLoggedIn} />
          
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

export default Events