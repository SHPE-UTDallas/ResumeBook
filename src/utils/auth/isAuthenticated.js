import {loginSuccess} from '../../redux/actions';
import store from '../../redux/store';
import {ENDPOINT} from '../../functions/utils/config';

export default async function isAuthenticated(props) {
    const response = await fetch(`${ENDPOINT}/auth/status`)
                            .then(response => {
                                if(response.status !== 200)
                                    return {};
                                else
                                    return response.json();
                            })
                            .catch(err => {
                                console.log(err);
                            });
    if(response.email)
    {
        store.dispatch(loginSuccess(response.verified));
    }
}