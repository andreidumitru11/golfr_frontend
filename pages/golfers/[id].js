import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../../lib/userAuth'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'

export const USER_SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

const ProfilePage = () => {
  const router = useRouter()
  const { id } = router.query

  const [ scores, setScores ] = useState([])
  const [ error, setError ] = useState('')
  const [ userName, setUserName ] = useState('')

  useEffect(() => {
    if (scores.length > 0) {
      setUserName(scores[0].user_name)
    }
  }, [ scores ])

  useEffect(() => {
    const fetcher = async () => {
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
          const error = new Error('An error occurred while fetching the data.')
          error.info = await res.json()
          error.status = res.status
          throw error
        }

        const data = await res.json()
        setScores(data.scores)
        setError('')
      } catch (err) {
        setError(err)
        setScores([])
      }
    }

    fetcher()
  }, [ id ])

  return <Layout>
    <>
      {error ? (
        error
      ) : (
        <>
          {userName && <h1>Scores for {userName} :</h1>}
          {scores && scores.map(score => (
            <ScoreCard
              key={score.id}
              id={score.id}
              totalScore={score.total_score}
              playedAt={score.played_at}
              userId={score.user_id}
              userName={score.user_name}
            />
          ))}
        </>
      )}
    </>
  </Layout>
}

export default ProfilePage
