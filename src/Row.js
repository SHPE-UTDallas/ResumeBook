import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { PDFObject } from 'react-pdfobject';

class Row extends React.Component {
    // ...
    constructor(props) {
        super(props);
        this.state = { expanded:false};
    }
    render() {
      const details = this.state.expanded ? (
        <TableRow>
          <TableCell colSpan={4} id={`u${this.props.data.id}`}>
            <Collapse in={this.state.expanded} unmountOnExit={true}>
                <PDFObject url={this.props.data.resume} height="500px" containerId={`u${this.props.data.id}`}/>    
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null;
  
        
      return (
        <React.Fragment>
            <TableRow key={this.props.data.name}>
                <TableCell component="th" scope="row">
                {this.props.data.linkedin
                    ? <a style={{textDecoration: "none", color: "inherit"}} target="_blank" href={this.props.data.linkedin}><i class="fa fa-linkedin-square mr-1" aria-hidden="true" style={{color:"#0077B5"}}></i> {this.props.data.name}</a>
                    :  this.props.data.name}
                </TableCell>
                    <TableCell align="left">{this.props.data.major}
                    </TableCell>
                <TableCell align="left">{this.props.data.standing}</TableCell>
                <TableCell align="left">
                    {/* <MuiThemeProvider theme={greenTheme}> */}
                        <Button variant="outlined" size="medium" style={{marginRight: '8px'}} onClick={() => this.setState(({ expanded }) => ({ expanded: !expanded }))} color="primary">View</Button>
                        <Button variant="outlined" color="primary">Add to Cart</Button>
                    {/* </MuiThemeProvider> */}
                </TableCell>
            </TableRow>
            {details}
        </React.Fragment>
      );
                            
    }
  }
  export default Row;