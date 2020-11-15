import PropTypes from 'prop-types'

function App(props) {
  props.history.push('/?logout=true')
  return <></>
}

App.propTypes = {
  history: PropTypes.object.isRequired,
}

export default App
