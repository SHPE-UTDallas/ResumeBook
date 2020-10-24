import React from 'react'
import Navbar from '../components/NavBar'
import PropTypes from 'prop-types'

function App(props) {
  const classes = props.classes
  return (
    <>
      <Navbar enableDrawer={false} classes={classes} />
      <div className={classes.toolbar} />
      <div style={{ justifyContent: 'center' }} className={classes.root}>
        <img
          style={{ width: '55.22px', height: '55.22px', margin: '21.44px 10px' }}
          alt="SHPE logo"
          src="https://i0.wp.com/www.shpesd.org/wp-content/uploads/2020/02/cropped-SHPE_logo_vert_SanDiegoPro_CMYK_HalfSize.png?fit=512%2C512"
        />
        <h1 style={{ margin: '21.44px 10px' }}>404 Page Not Found</h1>
      </div>
    </>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
