import { logoutSuccess } from '../../redux/actions'
import store from '../../redux/store'
import { ENDPOINT } from '../../utils/config'

export default async function logout() {
  const response = await fetch(`${ENDPOINT}/auth/logout`, {
    method: 'POST',
  }).then((response) => {
    console.log(response)
    return response.text()
  })
  if (response === 'Successfully logged out') store.dispatch(logoutSuccess())
}
