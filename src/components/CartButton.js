import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/actions'

class CartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { added: false }
  }

  handleAddToCart = () => {
    this.props.addToCart(this.props.userId)
    this.setState({ added: true })
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.props.userId)
    this.setState({ added: false })
  }

  render() {
    const button = this.props.ids.includes(this.props.userId) ? (
      <Button variant="outlined" color="secondary" onClick={this.handleRemoveFromCart}>
        Remove
      </Button>
    ) : (
      <Button variant="outlined" color="primary" onClick={this.handleAddToCart}>
        Add to Cart
      </Button>
    )
    return <React.Fragment>{button}</React.Fragment>
  }
}

CartButton.propTypes = {
  userId: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
}
const mapDispatchToProps = {
  addToCart,
  removeFromCart,
}
const mapStateToProps = (state) => {
  const { ids } = state.cart
  return { ids: ids }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
