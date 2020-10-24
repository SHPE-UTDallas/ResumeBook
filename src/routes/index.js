import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import LandingPage from '../components/LandingPage'
import queryString from 'query-string'
import login from '../utils/auth/login'
import logout from '../utils/auth/logout'

function App(props) {
  const classes = props.classes
  const parsed = queryString.parse(props.location.search)
  const [open, setOpen] = React.useState(true)

  if (parsed.login) {
    login()
  }
  if (parsed.logout) {
    logout()
  }

  return (
    <div className={classes.root}>
      <NavBar enableDrawer={false} classes={classes} />
      <LandingPage
        classes={classes}
        login={parsed.login}
        logout={parsed.logout}
        open={open}
        setOpen={(e) => setOpen(e)}
      />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default App
