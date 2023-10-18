import { useAuthContext } from './useAuthContext'
export const useUserLogout = () => {
  const { dispatch } = useAuthContext()
  const userlogout = () => {
    localStorage.removeItem('user')
    {<a href="/">  </a> }
    dispatch({ type: 'USERLOGOUT' })
  }
  return { userlogout }
}