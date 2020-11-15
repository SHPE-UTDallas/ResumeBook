import PropTypes from 'prop-types'
import Carousel from './Carousel'
import './styles/LandingPage.sass'
import LandingInfo from './LandingInfo'
import Alert from '@material-ui/lab/Alert'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function App(props: any) {
  const classes = props.classes
  const login = props.login
  const logout = props.logout
  const open = props.open
  const setOpen = props.setOpen

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
      {login||logout?<Collapse in={open}
        style={{
          width: '300px',
          margin: '0 auto',
        }}
      > 
        <Alert severity="success" 

        style={{
          marginBottom: '16px',
        }}

          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >{login? "Login Successful" : "Logout Successful"}
        
        </Alert>
        </Collapse> : <></>}
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
