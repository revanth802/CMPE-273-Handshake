import React,{ Component } from "react";
import axios from "axios";
import dateFormat from 'dateformat';
import Popup from "reactjs-popup";
import {Redirect} from 'react-router';


class StudentEvents extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        msg : [],
        eventmsg : "",
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
        allevents : [],
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

    handleOnChange(event)
    {
        this.setState({searchValue: event.target.value});

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
  
        axios.get('http://localhost:8080/viewregisteredevents')
                .then((response) => {
                    console.log("in events");
                    console.log(response.data);
                    
                //update the state with the response data
                this.setState({
                    events : response.data["results"],
                    companyname :  sessionStorage.getItem("cname")
                });
                console.log("events",this.state.events);
            });

            axios.get('http://localhost:8080/viewallevents')
            .then((response) => {
                console.log("in All events");
                console.log("in all events",response.data["results"]);
                
            //update the state with the response data
            this.setState({
                allevents : response.data["events"],
                companyname :  sessionStorage.getItem("cname")
            });
            console.log("events",this.state.allevents);
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
      authFlag : 1
    })
    }
  });
};



searchforeventname = (e) =>
{
    const data = {
        searchValue: this.state.searchValue
      };
      console.log("Data is", data);
      axios
        .post(
          `http://localhost:8080/eventnamefilter`,
          data
        )
        .then(response => {
            console.log("response data",response.data);
            this.setState({
                events : response.data,
                allevents : response.data
            });
            console.log("events",this.state.events);
            
        });
}

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

applyforevent = (e,eventid,eligibility) =>
{
  console.log("in view", eventid);
  const data = {
    eventid : eventid,
    eligibility : eligibility
}
console.log("in event", eventid)
axios.post("http://localhost:8080/applyforevent", data).then(response => {
console.log("applyreg",response.data);
if(response.data === "success")
{
  this.setState({
    eventmsg : "Applied successfully"
  })
}
else{
  if(response.data === "fail")
  {
    this.setState({
      eventmsg : "Not Eligible to Register"
    })
  }
}
});
    
}



render() {


    let rendermsg = null;
    rendermsg = this.state.msg;
    const isLoggedIn = this.state.isLoggedIn;
    var button;
    var signupform;
    var loginform;
    var msgstudent;
    var registerbutton;
  
    var  redirectVar;

   if(this.state.authFlag == 2)
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
        return <h1 align="center"> <h2>Registered Events</h2></h1>;
      }


      
    function LoginButton(props) {
      return (
        <div  style ={{width:'50%'}}>
          <button align="center" class="btn btn-primary" onClick={props.onClick}>
       List of Events
        </button>   
        </div>         
      );
    }
    
    function LogoutButton(props) {
      return (
        <div  style ={{width:'50%'}}>
        <button onClick={props.onClick} class="btn btn-primary">
         View Registered events
         </button>
         </div>
      );
    }





      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
  
        
       
        signupform = 
        (   
          this.state.allevents.map(event => {
            return(
              <div>
                
                {redirectVar}
                <div className="row" key = {event.event_name}>	
                <div className="well" style ={{height:'175px',width:'50%'}}>
                    <h3>{event.event_name}</h3>
                        <h4>{event.event_desc}</h4>
                        <p> {event.event_time}, {event.location} </p>
                        <p>{event.eligibility}</p>
                        <button onClick={e =>
                          this.applyforevent(
                            e,
                            event.event_id,
                            event.eligibility
                      
                          )} style = {{align :'right'}}> Apply </button>
                       
                </div>
                </div> 
                </div>   
        )
              })

        )
      }

      else {
        
        button = <LoginButton onClick={this.handleLoginClick} />;
       
        
            console.log("logged In inside console")
           
            const element = <Welcome name="Sara" />;

            
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
                <p> {event.eligibility} </p>
      
               
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
            <div align="center">
            <p style={{color:"red",color:"center"}}> {this.state.eventmsg} </p>

            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Event Name / Location"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <br></br>
            <button style={{width:"100px"}} onClick={event =>
                  this.searchforeventname(
                    event
                  )}>Search</button>
            
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

export default StudentEvents