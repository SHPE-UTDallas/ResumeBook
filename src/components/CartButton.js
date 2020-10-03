import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, removeFromCart, filterTableData } from '../redux/actions'

class CartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      added: false,
      data: [...this.props.data],
    }
  }

  handleAddToCart = () => {
    this.props.addToCart(this.props.users)
    this.setState({ added: true })
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.props.users)
    this.setState({ added: false })
  }

  render() {
    const button = this.props.userList.includes(this.props.users) ? (
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
  users: PropTypes.object,
  userList: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  filterTableData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
}
const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  filterTableData,
}
const mapStateToProps = (state) => {
  const { users } = state.cart
  const { tableData } = state.data
  return { data: tableData, userList: users }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
