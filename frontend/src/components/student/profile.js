import React, {Component} from 'react';


class profile extends Component
{
    render()
    {
        return(
            <div style={{backgroundColor:"red"}}>
            <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p>Student Registration Form</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Username *" name="username"value=""/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Phone Number *" name="mobile" value=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Password *" name="password" value=""/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Confirm Password *" value=""/>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btnSubmit">Submit</button>
                </div>
            </div>
        </div>
        </div>
        )
    }
}

export default profile;