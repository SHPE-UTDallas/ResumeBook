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
      <img
        key={`carousel-img-${i}`}
        src={`/carousel/${i}.jpg`}
        alt="SHPE organization images"
      />
    )
  }

  return (
    <div className={classes.content + ' landing-content'}>
      <div className={classes.toolbar} />
      <Carousel
        // auto
        width="100%"
        aspect={[4, 3]}
        maxWidth="40em"
        height="30em"
        className="landing-carousel"
      >
        {carousel}
      </Carousel>
      <br />
      <LandingInfo />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
