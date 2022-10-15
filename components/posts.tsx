import useSWR from 'swr'
import truncate from 'truncate'
import { Post } from '../types/types'
import ProjectCard from './project-card'

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

  return (
    <div className="flex flex-col items-center mt-4">
      {posts.map((post: Post) => (
        <ProjectCard
          username={post.username}
          avatar={post.avatar[0].url}
          description={truncate(post.description, 90)}
          image={post.attachments[0].url}
        />
      ))}
    </div>
  )
}

export default Posts
