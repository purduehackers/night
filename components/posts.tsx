import { LightningTime } from '@purduehackers/time'
import { useEffect, useState } from 'react'
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

  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(new Date()).lightningString
      setColors(Object.values(lt.getColors(convertedTime)))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center mt-4">
      {posts.map((post: Post, i: number) => (
        <ProjectCard
          username={post.username}
          key={i}
          avatar={post.avatar[0].url}
          description={truncate(post.description, 90)}
          image={post.attachments[0].url}
          color={colors[i]}
        />
      ))}
    </div>
  )
}

export default Posts
