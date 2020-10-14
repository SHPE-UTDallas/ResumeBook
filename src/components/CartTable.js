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
import SearchBar from './SearchBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const greenTheme = createMuiTheme({
  palette: { primary: { 500: '#28a745' } },
})

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  async componentDidMount() {
    // dummy data for now
    this.props.storeDataFromAPI([
      {
        _id: 1,
        name: 'Mahmud Bouda',
        linkedin: 'http://dummyimage.com/199x136.bmp/dddddd/000000',
        gpa: 1.0,
        major: 'Biomedical Engineering',
        standing: 'Senior',
        resume:
          'https://engineering.utdallas.edu/engineering/files/IPP-Resume-Tips-Samples-2019.pdf',
      },
      {
        _id: 2,
        name: 'Libbi Worman',
        linkedin: 'http://dummyimage.com/217x234.jpg/cc0000/ffffff',
        gpa: 3.7,
        major: 'Other',
        standing: 'Junior',
        resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
      },
      {
        _id: 3,
        name: 'Derry de Broke',
        linkedin: 'http://dummyimage.com/139x182.bmp/dddddd/000000',
        gpa: 1.3,
        major: 'Computer Science',
        standing: 'Freshman',
        resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
      },
      {
        _id: 4,
        name: 'Britni De Ath',
        linkedin: 'http://dummyimage.com/192x114.jpg/cc0000/ffffff',
        gpa: 0.3,
        major: 'Computer Science',
        standing: 'Graduate Student',
        resume:
          'https://engineering.utdallas.edu/engineering/files/IPP-Resume-Tips-Samples-2019.pdf',
      },
      {
        _id: 5,
        name: 'Kimberly Pellett',
        linkedin: 'http://dummyimage.com/248x153.bmp/cc0000/ffffff',
        gpa: 2.8,
        major: 'Computer Engineering',
        standing: 'Senior',
        resume: 'https://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf',
      },
    ])
    console.log(this.props.data)
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

  render() {
    return (
      <>
        <SearchBar classes={this.props.classes} />
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
                  <MuiThemeProvider theme={greenTheme}>
                    {/*Should add Download all here  documentId={`${props.data._id}`}  not working here*/}
                  </MuiThemeProvider>
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
  const { tableData } = state.data
  const { category, direction } = state.data.sort
  return { data: tableData, orderBy: category, order: direction }
}
const mapDispatchToProps = {
  storeDataFromAPI,
  sortTable,
  filterNameDel,
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable)
