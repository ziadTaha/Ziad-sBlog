import React from "react"
import personal from '../images/personal.jpg'
import './About.css'

const About = () => {
    
    return (
        <div className="container">
            
                <img className="personal-img" src={personal}></img>
                <p className="dname"> Ziad Taha</p>
                <p className="title"> software developer</p>
                <div className="details">
                    <p className="center"> Computer and Systems department Faculty of Engineering 2021 graduate</p>
                    <div className="links">
                        <a href="https://www.linkedin.com/in/ziad-taha-b10a60159/" class="fa fa-linkedin"></a>
                        <a href="https://github.com/ziadTaha/" class="fa fa-github"></a>
                    </div>
                    <p className="center">ziadtaha197@gmail.com</p>
                </div>

        </div>
    )
}

export default About