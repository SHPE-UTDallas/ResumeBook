import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import LabelInput from './LabelInput'
import Select from '@material-ui/core/Select'

import { connect } from 'react-redux'
import {
  addFilter,
  removeFilter,
  increaseGPA,
  decreaseGPA,
  toggleDrawer,
} from '../redux/actions'
import PropTypes from 'prop-types'

const blueTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f50b5',
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})

function ResponsiveDrawer(props) {
  const classes = props.classes
  const mobileOpen = props.mobileOpen
  const theme = useTheme()

  const handleDrawerToggle = () => {
    props.toggleDrawer()
  }

  const handleChange = (name, category) => {
    if (props[category][name]) props.removeFilter(name, category)
    else props.addFilter(name, category)
  }

  const handleGPAChange = (gpa) => {
    if (gpa > props.gpa.min) props.increaseGPA(gpa, 'gpa')
    else props.decreaseGPA(gpa)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <MuiThemeProvider theme={blueTheme}>
        <Box ml={1}>
          <h2>Filter Options</h2>
          <Box ml={1}>
            <FormGroup>
              <Grid item xs={12}>
                <LabelInput name="major" label="Display">
                  <Grid item xs={6}>
                    <Select
                      native
                      name="major"
                      //onChange={this.checkOther}
                    >
                      <option>All</option>
                      <option>Approved</option>
                      <option>Unapproved</option>
                    </Select>
                  </Grid>
                </LabelInput>
                <h3
                  style={{
                    marginTop: '0px',
                    marginBottom: '0px',
                  }}
                >
                  GPA
                </h3>
              </Grid>
              <Grid container>
                <FormControlLabel
                  label="Minimum GPA:"
                  labelPlacement="start"
                  style={{ marginRight: '0px', justifyContent: 'start' }}
                  control={
                    <Grid item xs={4}>
                      <Input
                        className={classes.title}
                        value={props.gpa.min}
                        type="number"
                        onChange={(e) => handleGPAChange(e.target.value)}
                        id="quantity"
                        name="quantity"
                        inputProps={{
                          step: 0.1,
                          min: 0,
                          max: 4,
                        }}
                      />
                    </Grid>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ marginBottom: '0px' }}>Standing</h3>
              </Grid>
              <div className={classes.formEntry}>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.standing.grad}
                        onChange={(e) => handleChange(e.target.name, 'standing')}
                        color="primary"
                        name="grad"
                      />
                    }
                    label="Graduate Student"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.standing.senior}
                        onChange={(e) => handleChange(e.target.name, 'standing')}
                        color="primary"
                        name="senior"
                      />
                    }
                    label="Senior"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.standing.junior}
                        onChange={(e) => handleChange(e.target.name, 'standing')}
                        color="primary"
                        name="junior"
                      />
                    }
                    label="Junior"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.standing.sophomore}
                        onChange={(e) => handleChange(e.target.name, 'standing')}
                        color="primary"
                        name="sophomore"
                      />
                    }
                    label="Sophomore"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.standing.freshman}
                        onChange={(e) => handleChange(e.target.name, 'standing')}
                        color="primary"
                        name="freshman"
                      />
                    }
                    label="Freshman"
                  />
                </Grid>
              </div>
              <Grid item xs={12}>
                <h3 style={{ marginBottom: '0px' }}>Major</h3>
              </Grid>
              <div className={classes.formEntry}>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.be}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="be"
                      />
                    }
                    label="Biomedical Engineering"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.ce}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="ce"
                      />
                    }
                    label="Computer Engineering"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.cs}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="cs"
                      />
                    }
                    label="Computer Science"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.ee}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="ee"
                      />
                    }
                    label="Electrical Engineering"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.me}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="me"
                      />
                    }
                    label="Mechanical Engineering"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.se}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="se"
                      />
                    }
                    label="Software Engineering"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.formEntry}
                    control={
                      <Switch
                        checked={props.major.other}
                        onChange={(e) => handleChange(e.target.name, 'major')}
                        color="primary"
                        name="other"
                      />
                    }
                    label="Other"
                  />
                </Grid>
              </div>
            </FormGroup>
          </Box>
        </Box>
      </MuiThemeProvider>
    </div>
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  gpa: PropTypes.object.isRequired,
  increaseGPA: PropTypes.func.isRequired,
  decreaseGPA: PropTypes.func.isRequired,
  standing: PropTypes.object.isRequired,
  major: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { mobileOpen } = state.data
  const { gpa, standing, major } = state.data.passingTags
  return {
    mobileOpen: mobileOpen,
    gpa: gpa,
    standing: standing,
    major: major,
  }
}

const mapDispatchToProps = {
  addFilter,
  removeFilter,
  increaseGPA,
  decreaseGPA,
  toggleDrawer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer)
