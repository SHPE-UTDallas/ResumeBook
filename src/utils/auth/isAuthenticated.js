import { connect } from "react-redux";
import {loginSuccess} from '../../redux/actions';
import store from '../../redux/store';

export default async function isAuthenticated(props) {
    const test = await fetch('/.netlify/functions/auth/status');
    console.log(test);
    if(test.status===200)
        store.dispatch(loginSuccess());

}