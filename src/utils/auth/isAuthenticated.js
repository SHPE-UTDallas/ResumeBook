import { loginSuccess } from '../../redux/actions'
import store from '../../redux/store'
import { ENDPOINT } from '../../utils/config'

export default async function isAuthenticated () {
  const response = await fetch(`${ENDPOINT}/auth/status`)
    .then(response => {
      if (response.status !== 200) return {}
      else return response.json()
    })
    .catch(err => {
      console.error(err)
    })
  if (response.email) {
    store.dispatch(loginSuccess(response.verified))
  }
}
