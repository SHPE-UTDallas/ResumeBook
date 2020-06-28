import { logoutSuccess } from '../../redux/actions'
import store from '../../redux/store'
import { ENDPOINT } from '../../utils/config'

export default async function isAuthenticated () {
  const response = await fetch(`${ENDPOINT}/auth/logout`).then(response =>
    response.text()
  )
  if (response === 'Successfully logged out') store.dispatch(logoutSuccess())
}
