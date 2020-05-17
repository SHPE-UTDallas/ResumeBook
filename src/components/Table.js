import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {connect} from 'react-redux';
import {storeDataFromAPI, sortTable} from '../redux/actions';
import PropTypes from 'prop-types';
import Row from './Row';

class SimpleTable extends React.Component {

    componentDidMount() {
        fetch(this.props.url)
          .then(function(response) {
            return response.json();
          })
          .then(items => this.props.storeDataFromAPI(items));
          
    }
    
    handleSort = ((category) => {
      const {orderBy, order} = this.props
      const isAsc = orderBy === category && order === 'asc';
      if(isAsc)
        this.props.sortTable(category, 'desc');
      else
        this.props.sortTable(category, 'asc');
    });

    render() {
        var newData = this.props.data;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                      <TableCell size="small">Name</TableCell>
                      <TableCell align="left" onClick={e => this.handleSort('major')} size="small">Major
                        <TableSortLabel
                            active={this.props.orderBy === 'major'}
                            direction={this.props.orderBy === 'major' ? this.props.order : 'asc'}
                        />
                      </TableCell>
                      <TableCell align="left" size="small" onClick={e => this.handleSort('standing')}>Standing
                        <TableSortLabel
                          active={this.props.orderBy === 'standing'}
                          direction={this.props.orderBy === 'standing' ? this.props.order : 'asc'}
                        />
                      </TableCell>
                      <TableCell align="left" size="medium"> Resume</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {newData ? newData.map((row) => (
                          <Row key={row._id} data={row} />
                      )): <TableCell>Loading</TableCell>}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

SimpleTable.propTypes = {
  url: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}



const mapStateToProps = state => {
  const {tableData} = state.data;
  const {category, direction} = state.data.sort;
  return {data: tableData, orderBy: category, order: direction};
}
const mapDispatchToProps = {
  storeDataFromAPI,
  sortTable
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SimpleTable);