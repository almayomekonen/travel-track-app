import React from 'react'
import Featurebox from './Featurebox'
import mapimage from '../images/map.svg'
import briefcase from '../images/briefcase.svg'
import airplane from '../images/airplane.svg'
import './Feature.css'

const Feature = () => {
  return (
    <>
      <div id="features">
        <h1>FEATURES</h1>
        <div className="a-container">
          <Featurebox
            image={mapimage}
            title="Discover"
            text={
              'Explore Exciting Destinations with Ease, New Places in One Click!'
            }
          />
          <Featurebox
            image={airplane}
            title="Embark"
            text={'Embark on thrilling journeys,and to new adventures.'}
          />
          <Featurebox
            image={briefcase}
            title="Organize"
            text={'Come, Relax, and Let Us Handle the Rest.'}
          />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <hr />
    </>
  )
}

export default Feature
