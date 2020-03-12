import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Form,Col} from 'react-bootstrap'

class CompanyProfile extends Component
{
    constructor(props)
    {
        super();
        this.state=
        {
            msg:"",
            arr:[],
            rd:0
        }
        this.handleChange= this.handleChange.bind(this)
    }

  back=() =>
  {
this.setState({rd:1})
  }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

   

    componentDidMount()
{
   
    //make a post request with the user data
    axios.get('http://localhost:8080/cupd')
    .then(response => {
        // const data = response.data["results"];
        console.log("response data from axios", response.data);
        if(response.data){
            this.setState({
                arr: response.data['results']
                  
            })
console.log(this.state.arr[0].company_id);
        }
      
    });

}

ex=()=>
{
    const data=
    {
        cname : this.state.cname,
        email : this.state.email,
        phoneno: this.state.phoneno,
        city: this.state.city,
        country:this.state.country,
        jobdesc:this.state.jobdesc,
        state:this.state.state
    }
    
    axios.post('http://localhost:8080/cupd1',data)
    .then(response => {
        // const data = response.data["results"];
        console.log("response data from axios", response.data);
        this.setState
        ({
            msg: response.data
        });

        }
      
    )
}
  

    render() {
        let redirectVar = null;
        var xy;
        if(this.state.rd===1)
        redirectVar= <Redirect to='/Companydashboard' />
        
         xy=this.state.arr.map(arr=> 
     { return (
          <div>
            {redirectVar}
            <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Company name"
                  defaultValue={this.state.arr[0].company_name}
                  onChange={this.handleChange}
                  name="cname"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              </Form.Row>
         
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Email"
                  defaultValue={this.state.arr[0].email}
                  onChange={this.handleChange}
                  name="email"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={this.state.arr[0].phone_no}
                  onChange={this.handleChange}
                  name="phoneno"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={this.state.arr[0].city}
                  onChange={this.handleChange}
                  name="city"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={this.state.arr[0].state}
                  onChange={this.handleChange}
                  name="state"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Country </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={this.state.arr[0].country}
                  onChange={this.handleChange}
                  name="country"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Company description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Job description"
                  defaultValue={this.state.arr[0].company_desc}
                  onChange={this.handleChange}
                  name="jobdesc"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
             


                  <button onClick={this.ex} className="btn btn-primary">
                    Update details
                  </button>

                  <button onClick= {this.back} className="btn btn-primary">
                  Back to Dashboard
                  </button>
               
        <p style={{color:"red",alignContent:"center"}}>  {this.state.msg} </p> 
          </div>
        )});
    
      return (
      <div>{xy}
      <br>
      </br>
      <img src ={require("../Util/es.png") } alt="hs" style={{float:"bottom",height:"500px",width:"1000px",alignContent:"center"}}/> 
      </div>
      )
}
}

export default CompanyProfile