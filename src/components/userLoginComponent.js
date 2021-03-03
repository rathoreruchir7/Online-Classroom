import React, {Component} from 'react';
import { Link,withRouter } from 'react-router-dom';

class UserLogin extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            rollNo: "",
            password: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
      console.log("jkjk");
    }

    handleLogin(event) {
        this.props.loginUser({username: this.state.rollNo,password: this.state.password}, this.props.history);
        // console.log(JSON.stringify({username: this.state.rollNo,password: this.state.password}));
        // fetch( "http://localhost:3000/" + 'users/login', {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type':'application/json',
        // },
        //     body: JSON.stringify({username: this.state.rollNo,password: this.state.password}),
        // })
        // .then(response => {
        //     console.log(response);
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        //     },
        //     error => {
        //         throw error;
        //     })
        //     .then(response => response.json())
        //     .then(response => {
        //         if (response.success) {
        //             localStorage.setItem('token', response.token);
        //             localStorage.setItem('creds', JSON.stringify({username: this.state.rollNo}));
        //             console.log(response);
        //             // Dispatch the success action
        //             this.props.history.push('/dashboard');
        //         }
        //         else {
        //             var error = new Error('Error ' + response.status);
        //             error.response = response;
        //             throw error;
        //         }
        //     })
        //     .catch(error => console.log(error));
        //   console.log("arrrrmmmm");
            event.preventDefault();
    }

    render(){
        return (
              
              <div className="Body">
                  <div className="LoginContainer">
                      <img src="/userFace.png" alt="me" className='image'></img>
                      <div >
                          <input type="text" className="field" id="rollNo" name="rollNo"  placeholder="Roll No." onChange={this.handleInputChange}></input>
                          
                          </div>
                      <div>
                          <input type="password" className="field"  id="password" name="password"  placeholder="password" onChange={this.handleInputChange}></input>
                        </div>
                        <button className="login-btn" onClick={this.handleLogin}><span>Login</span></button>
                        <br />
                        <Link to='/users/signup'>Register</Link>
                      
                        </div>
    
                </div>
            
            );
    }
       
    
}
export default withRouter(UserLogin);