import {loginSuccess} from '../../redux/actions';
import store from '../../redux/store';
import {ENDPOINT} from '../../functions/utils/config';

export default async function isAuthenticated(props) {
    const response = await fetch(`${ENDPOINT}/auth/status`).then(response => response.json());
    if(response.email)
        store.dispatch(loginSuccess());
}