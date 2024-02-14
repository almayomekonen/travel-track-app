import React from 'react'
import aboutImage from '../images/about.png'
import Button from '../shared/components/FormElements/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../shared/context/auth-context'
import { useContext } from 'react'
import './About.css'
const About = () => {
  const auth = useContext(AuthContext)
  return (
    <div id="about">
      <div className="about-image">
        <img src={aboutImage} alt="" />
      </div>
      <div className="about-text">
        <h1>LERAN MORE ABOUT US</h1>
        <p>
          Experience travel made easy with our innovative platform. Imagine a
          world where you simply click on our app, and we instantly generate
          personalized travel options tailored to your specific location. At
          Travel Track, we've redefined the way you explore. Our user-friendly
          app takes the hassle out of trip planning, providing you with the best
          options.
        </p>
        <br />
        <p>
          Join us on a journey where travel planning is effortless, and your
          next adventure is just a click away. Discover the world with ease, one
          destination at a time.
        </p>

        {auth.isLoggedIn ? (
          <Link to="/places/build">
            <Button>Get Started</Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button>Next Step</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default About
