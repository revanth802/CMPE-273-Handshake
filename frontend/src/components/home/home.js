import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });
    }

    render(){
       
   
        //if not logged in go to login page
        let redirectVar = null;
     /*   if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } */
        return(
            <div>
                {redirectVar}
                <div class="container">
                  
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;