import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserRegister extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            name: '',
            rollNo: "",
            password: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleInputChange(event) {

        const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    
    }

handleSignUp(event) {
        console.log(JSON.stringify({username: this.state.rollNo,password: this.state.password,name: this.state.name, rollNo: this.state.rollNo}));
        fetch( "http://localhost:3000/" + 'users/signup', {
            method: 'POST',
            headers: { 
            
                'Content-Type':'application/json',
        },
            body: JSON.stringify({username: this.state.rollNo,password: this.state.password,name: this.state.name, rollNo: this.state.rollNo}),
        
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log(response);
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            },
            error => {
                throw error;
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    fetch( "http://localhost:3000/" + 'users/login', {
                method: 'POST',
                headers: { 
                    
                        'Content-Type':'application/json',
                },
                    body: JSON.stringify({username: this.state.rollNo,password: this.state.password}),
                
                })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        console.log(response);
                    
                            return response;
                        } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                    }
                    },
                    error => {
                        throw error;
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            console.log("You have been registered.");
                            // If login was successful, set the token in local storage
                            localStorage.setItem('token', response.token);
                            localStorage.setItem('creds', JSON.stringify({username: this.state.rollNo}));
                            console.log(response);
                            // Dispatch the success action
                            this.props.history.push('/dashboard');
                        }
                        else {
                            var error = new Error('Error ' + response.status);
                            error.response = response;
                            throw error;
                        }
                    })
                    .catch(error => console.log(error));
                    
                }
                else {
                    var error = new Error('Error ' + response.status);
                    error.response = response;
                    throw error;
                }
            })
            .catch(error => console.log(error));
          console.log("arrrrmmmm");
            event.preventDefault();
    }

    render(){
        return (
              <html>
              <div className="Body">
                  <div className="RegisterContainer">
                      <img src="/userFace.png" alt="me"className='image'></img>
                      <div >
                          <input type="text" className="field" id="Name" name="Name" placeholder="Name" onChange={this.handleInputChange}></input>
                          
                          </div>
                      <div >
                          <input type="text" className="field" id="rollNo" name="rollNo" placeholder="Roll No." onChange={this.handleInputChange}></input>
                          
                          </div>
                      <div>
                          <input type="password" className="field"  id="password" name="password" placeholder="Password" onChange={this.handleInputChange}></input>
                        </div>
                        <button className="login-btn" onClick={this.handleSignUp}><span>Register</span></button>
                        <Link to='/users/login'>Login</Link>
                        </div>
                       
                </div>
            </html>
            );
    }
       
    
}
export default UserRegister;