import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


import Grid from '@material-ui/core/Grid';
import {UnmountClosed} from 'react-collapse';
import { PDFObject } from 'react-pdfobject'
import Row from './Row';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, ),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];
const greenTheme = createMuiTheme({ palette: { primary: {500: "#28a745" }, } });
class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], open:false};
        this.onSort = this.onSort.bind(this)
    }

    componentDidMount() {
        fetch("http://demo8344494.mockable.io/")
          .then(function(response) {
            return response.json();
          })
          .then(items => this.setState({ data: items.users }));
          
    }

    onSort(event, sortKey){
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
        const data = this.state.data;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({data})
    }

    render() {
        var newData = this.state.data;
        const {open} = this.state;
        var PDFObject = require('pdfobject');
        console.log(PDFObject);
        console.log(PDFObject.embed("http://www.mccc.edu/programs/engr_sci_as/pdf/resume.pdf", "#hello"));
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
                    {newData.map((row) => (
                        <Row data={row} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default SimpleTable