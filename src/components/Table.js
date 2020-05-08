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
import {storeDataFromAPI} from '../redux/actions';
import Row from './Row';

class SimpleTable extends React.Component {

    componentDidMount() {
        fetch("https://demo8344494.mockable.io/new")
          .then(function(response) {
            return response.json();
          })
          .then(items => this.props.storeDataFromAPI(items));
          
    }


    render() {
        var newData = this.props.data;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell size="small">Name</TableCell>
                        <TableCell align="left" sortDirection="asc" size="small">Major</TableCell>
                        <TableCell align="left" size="small">Standing
                        <TableSortLabel
                                    active={true}
                                    direction='asc'
                                ></TableSortLabel></TableCell>
                        <TableCell align="left" size="medium"> Resume</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {newData ? newData.map((row) => (
                        <Row key={row.id} data={row} />
                    )): <TableCell>Loading</TableCell>}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

const mapStateToProps = state => {
  const {tableData} = state.data;
  return {data: tableData};
}
export default connect(
  mapStateToProps,
  {storeDataFromAPI})
  (SimpleTable);