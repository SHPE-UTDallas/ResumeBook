import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import './styles/LandingPage.sass'

function App(props) {
  const classes = props.classes
  const xsButton = 8
  const smButton = 3

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <div id="info">
        <h1 id="info-title">What is ResumeBook?</h1>
        <Grid container id="info-content">
          <Grid item sm={12 - 1 - smButton} xs={12}>
            <p>
              ResumeBook was created by the members of SHPE UTD to bring sponsors a simple
              and unique way to find the resumes they need. It gives the ability to search
              by GPA, major, and even year. To see experience a preview of what this might
              look like, go ahead and try the demo! If you are a sponsor of SHPE UTD, go
              ahead and log in through the sponsor button.
            </p>
          </Grid>
          <Grid item sm={1} xs={6 - xsButton / 2} />
          <Grid
            item
            container
            direction="column"
            sm={smButton}
            xs={xsButton}
            id="demo-sponsor"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                to="/demo"
                component={RouterLink}
              >
                Demo
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                to="/resumes"
                component={RouterLink}
              >
                Sponsor
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App
