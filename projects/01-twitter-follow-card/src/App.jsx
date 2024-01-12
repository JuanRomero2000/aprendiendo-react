import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
      userName: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: true
    },
    {
      userName: 'pheralb',
      name: 'Pablo H.',
      isFollowing: false
    },
    {
      userName: 'Cristiano',
      name: 'Cristiano Ronaldo',
      isFollowing: true
    },
    {
      userName: 'MoureDev',
      name: 'Brais Moure',
      isFollowing: false
    }
]

export function App () {
    return (
      <section className='App'>
        {
          users.map(({ userName, name, isFollowing }) => (
            <TwitterFollowCard
              key={userName}
              name={name}
              userName={userName}
              initialIsFollowing={isFollowing}
            >
            </TwitterFollowCard>
          ))
        }
      </section>
    )
}