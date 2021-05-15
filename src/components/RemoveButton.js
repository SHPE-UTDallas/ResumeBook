import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/actions'

function Remove(props) {
  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch(removeFromCart(props.candidate))}
      >
        Remove
      </Button>
    </React.Fragment>
  )
}

Remove.propTypes = {
  candidate: PropTypes.object.isRequired,
}
export default Remove
