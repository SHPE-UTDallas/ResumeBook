import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import './styles/NavBar.sass'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = { numInCart: 0 }
  }

  render() {
    return (
      <div id="cart-navbar">
        <Typography className={this.props.classes.cartText}>
          {this.props.numInCart}
        </Typography>
        <PersonIcon className={this.props.classes.cart} />
      </div>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  numInCart: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  const { numInCart } = state.cart
  return { numInCart: numInCart }
}

export default connect(mapStateToProps)(Cart)
