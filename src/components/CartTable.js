import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { connect } from 'react-redux'
import { storeDataFromAPI, sortTable, filterNameDel } from '../redux/actions'
import PropTypes from 'prop-types'
import CartRow from './CartRow'
import LoadingIndicator from './LoadingIndicator.js'
import DownloadAllButton from '../components/DownloadAllButton'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'

const greenTheme = createMuiTheme({
  palette: { primary: { 500: '#28a745' } },
})

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      errorMessage: '',
    }
  }

  async componentDidMount() {
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    /*TODO: Revisit this if we see that users want to switch back and forth between /demos and /resumes a lot
     *     The 2nd option would improve the UX in that case
     *     The 1st option should work just fine for our currently expected use case
     * Possible options:
     *
     * Delete data everytime component unmounts
     *   Pros:
     *     Smaller memory footprint
     *     Easy to implement
     *   Cons:
     *     More API calls are necessary
     *
     * Have two distinct variables for the fake data and real resume data in Redux
     *   Pros:
     *     Less API calls necessary
     *   Cons:
     *     More complicated implementation
     *        - Have to rewrite or change a lot of the redux reducers
     *     Bigger memory footprint
     */

    //Restore defaults
    //TODO: Should we reset filters too??
    this.props.storeDataFromAPI([])
    this.props.sortTable('standing', 'asc')
    this.props.filterNameDel('')
  }

  handleSort = (category) => {
    const { orderBy, order } = this.props
    const isAsc = orderBy === category && order === 'asc'
    if (isAsc) this.props.sortTable(category, 'desc')
    else this.props.sortTable(category, 'asc')
  }

  tableBody = () => {
    const tableData = this.props.data
    const content = (
      <React.Fragment>
        {tableData.map((row) => (
          <CartRow key={row._id} data={row} />
        ))}
      </React.Fragment>
    )

    return content
  }

  setErrorMesage = (message) => {
    this.setState({ errorMessage: message })
  }

  render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={5} sm={3}></Grid>
          <Grid item xs={2} sm={4}></Grid>
          <Grid item xs={5} sm={4}>
            <DownloadAllButton
              style={{
                marginTop: '10px',
                marginLeft: '17px',
              }}
              setErrorMessage={this.setErrorMesage}
            />
          </Grid>
        </Grid>
        {this.state.errorMessage ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="error">{this.state.errorMessage}</Alert>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small">Name</TableCell>
                <TableCell
                  align="left"
                  onClick={() => this.handleSort('major')}
                  size="small"
                >
                  Major
                  <TableSortLabel
                    active={this.props.orderBy === 'major'}
                    direction={this.props.orderBy === 'major' ? this.props.order : 'asc'}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  size="small"
                  onClick={() => this.handleSort('standing')}
                >
                  Standing
                  <TableSortLabel
                    active={this.props.orderBy === 'standing'}
                    direction={
                      this.props.orderBy === 'standing' ? this.props.order : 'asc'
                    }
                  />
                </TableCell>
                <TableCell align="left" size="medium">
                  Resume
                </TableCell>
                <TableCell align="left" size="medium">
                  <MuiThemeProvider theme={greenTheme}></MuiThemeProvider>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.tableBody()}</TableBody>
          </Table>
        </TableContainer>

        {this.state.loading && <LoadingIndicator />}
      </>
    )
  }
}

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  storeDataFromAPI: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  sortTable: PropTypes.func.isRequired,
  filterNameDel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const tableData = state.cart.users
  const { category, direction } = state.data.sort
  return { data: tableData, orderBy: category, order: direction }
}
const mapDispatchToProps = {
  storeDataFromAPI,
  sortTable,
  filterNameDel,
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable)
