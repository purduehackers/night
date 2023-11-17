import { useContext } from 'react'
import useSWR from 'swr'
import truncate from 'truncate'
import { Post } from '../types/types'
import ProjectCard from './project-card'
import { LightningTimeContext } from './lightning-time-context'

const Posts = () => {
  const fallbackData = [
    {
      username: '',
      avatar: [{ url: '' }],
      description: '',
      attachments: [{ url: '' }]
    }
  ]
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: posts } = useSWR('/api/fetch-posts', fetcher, {
    fallbackData,
    refreshInterval: 5000
  })

  const { currentColors } = useContext(LightningTimeContext)

  return (
    <div className="flex flex-col items-end pr-8 pl-11 mt-4 w-full">
      {posts.map((post: Post, i: number) => (
        <ProjectCard
          username={post.username}
          key={i}
          avatar={post.avatar[0].url}
          description={truncate(post.description, 90)}
          image={post.attachments[0].url}
          color={Object.values(currentColors)[i]}
        />
      ))}
    </div>
  )
}

export default Posts
