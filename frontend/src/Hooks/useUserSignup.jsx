import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useUserSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const signup = async (username, email, password ) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      alert("Signed up");
      window.location.href ="/"

      dispatch({type: 'USERLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}