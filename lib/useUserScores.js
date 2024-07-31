import { useState, useEffect } from 'react'
import { getToken } from './userAuth'

export const USER_SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

const useUserScores = id => {
  const [ scores, setScores ] = useState([])
  const [ error, setError ] = useState('')
  const [ userName, setUserName ] = useState('')

  useEffect(() => {
    const fetchScores = async () => {
      if (id === null || id === undefined) {
        return
      }
      try {
        const res = await fetch(`${USER_SCORES_URL}/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || 'An error occurred while fetching the data.')
        }

        const data = await res.json()
        setScores(data.scores)
        setError('')
        if (data.scores.length > 0) {
          setUserName(data.scores[0].user_name)
        } else {
          setUserName('')
        }

      } catch (error) {
        setError(error.message)
        setScores([])
        setUserName('')
      }
    }

    fetchScores()
  }, [ id ])

  return { scores, error, userName }
}

export default useUserScores
