import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {backend}  from "../../config";

class Events extends Component {
    constructor(){
        super();
        this.state = {  
            events : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get(backend+'/events')
                .then((response) => {
                    console.log("in events");
                    console.log(response.data);
                //update the state with the response data
                this.setState({
                    events : this.state.response.data
                });
            });
    }

    render(){
        
        console.log(this.state.jobs)
        //iterate over books to create a table row
        let details = this.state.events.map(event => {
            return(
                <div className="row" key = {event.event_name}>	
				<div className="well">
                    <h3>{event.event_name}</h3>
						<h4>{event.event_desc}</h4>
						<p> {event.event_time}, {event.location} </p>
                        <a href = '#'style = {{align :'right'}}> Register</a>
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
            <div>
                {redirectVar}
                <div className="container">
                    <h2>List of All Events</h2>
                        
                            <div>
                             {details}
                            </div>
                </div> 
            </div> 
        )
    }
}
export default Events;