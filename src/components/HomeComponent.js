import React, {Component} from 'react'
import '../vendors/css/grid.css'
import '../vendors/css/normalize.css'
import '../resources/css/style.css'

class Home extends Component{
    constructor(props)
    {
        super(props);

    }

    render()
    {
        return (
            <div className="featured">
                    <nav>
                        <div class="row">
                            <img className="logo" src="images/video-player.png" alt="" class='logo'/>
                            <ul class="main-nav">
                                <li ><a href="#">Home</a></li>
                                <li ><a href="#">About</a></li>
                                <li ><a href="#">Contact Us</a></li>
                                <li ><a href="#">Sign up</a></li>
                            </ul>

                            <div className="helpdesk-number"><a href="tel:+8839866618">Call me at +8839866618</a></div>

                        </div>
                    </nav>

                    <div class="hero-text-box">
                        <h1>Guided online tutoring through online chat and email.</h1>
                        <a class="btn btn-full" href="/users/login">Register</a>
                        
                    </div>
            </div> 
        );
    }
}

export default Home;