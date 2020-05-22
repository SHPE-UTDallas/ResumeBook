import React from 'react';
import NavBar from '../../components/NavBar';
import {Grid, FormControlLabel, Input, Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {connect} from 'react-redux';
import {loginSuccess} from '../../redux/actions';
import { withRouter } from 'react-router-dom'
import {ENDPOINT} from '../../functions/utils/config';

class VerifyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const endpoint_url = `${ENDPOINT}/auth/verify`
        const response = await fetch({endpoint_url}, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: this.state.value})
        }).then(response => response.text());
        if(response === "Successfully Verified")
        {
            console.log("About to do a thing");
            this.props.loginSuccess(true);
            this.props.history.push('/resumes');
        }
        else{
            //Pop up error messages
        }
        
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <NavBar enableDrawer={false} classes={classes}/>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                        <Grid 
                            container 
                            alignItems="center"
                            direction="column"
                            justify="center"
                            >
                            <h3>Please verify you account by inputting the code provided to you</h3>
                            <form onSubmit={this.handleSubmit} >
                                <FormControlLabel 
                                    className={classes.formEntry}
                                    control={<Input value={this.state.value} onChange={this.handleChange}/>}
                                    label="Code:"
                                    labelPlacement='top'
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<SendIcon />}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Grid>
                </div>
            </div>
        );
    }
}
export default connect(null, {loginSuccess})(withRouter(VerifyForm));

