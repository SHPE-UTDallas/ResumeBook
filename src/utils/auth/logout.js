import {logoutSuccess} from '../../redux/actions';
import store from '../../redux/store';

export default async function isAuthenticated(props) {
    const test = await fetch('/.netlify/functions/auth/logout');
    if(test.status===200)
        store.dispatch(logoutSuccess());

}