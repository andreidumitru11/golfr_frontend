import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUserScores from '../../lib/useUserScores'

const ProfilePage = () => {
  const router = useRouter()
  const { id } = router.query
  const { scores, error, userName } = useUserScores(id)

  return <Layout>
    <>
      {error ? (
        error
      ) : (
        <>
          {userName && <h1>Scores for {userName} : </h1>}
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
