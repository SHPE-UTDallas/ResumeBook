import store from '../../redux/store'
import isAuthenticated from '../../utils/auth/isAuthenticated'

export default async function login() {
  isAuthenticated().then(() => {
    const loggedIn = store.getState().auth.isAuthenticated
    const verified = store.getState().auth.isVerified
    localStorage.setItem('isLoggedIn', loggedIn)
    localStorage.setItem('verified', verified)
  })
}
