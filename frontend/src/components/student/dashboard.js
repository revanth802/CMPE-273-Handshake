import React from 'react';
import {Component} from 'react';

import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import log2 from './bg.jpg';


class dashboard extends Component
{
    
    render()
    {
        
        return (
            <div class="container">
            <a href="#" class="btn btn-sq-lg btn-primary">
            <i class="fa fa-user fa-5x"></i><br/>
            Demo Primary <br/>Button
        </a>
        <a href="#" class="btn btn-sq-lg btn-success">
          <i class="fa fa-user fa-5x"></i><br/>
          Demo Success <br/>Button
        </a>
        <a href="#" class="btn btn-sq-lg btn-info">
          <i class="fa fa-user fa-5x"></i><br/>
          Demo Info <br/>Button
        </a>
        <a href="#" class="btn btn-sq-lg btn-warning">
          <i class="fa fa-user fa-5x"></i><br/>
          Demo Warning <br/>Button
        </a>
        <a href="#" class="btn btn-sq-lg btn-danger">
          <i class="fa fa-user fa-5x"></i><br/>
          Demo Danger <br/>Button
        </a>
        </div>
          );
    }
}

export default dashboard;