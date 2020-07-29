import React from 'react'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import './styles/LandingPage.sass'
import LandingInfo from './LandingInfo'

function App(props: any) {
  const classes = props.classes

  const carousel = []
  for (let i = 1; i <= 4; i++) {
    carousel.push(
      // <div className="carousel-image">
      <img src={`/carousel/${i}.jpg`} alt="SHPE organization images" />
      // </div>
    )
  }

  return (
    <div className={classes.content + ' landing-content'}>
      <div className={classes.toolbar} />
      <div className="slider-container">
        <Carousel width="40em" height="30em" className="landing-carousel">
          {carousel}
        </Carousel>
      </div>
      <br />
      <LandingInfo />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
