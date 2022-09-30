import { Post } from '../types/posts'
import ProjectCard from './project-card'

const Posts = ({ posts }: { posts: Post[] }) => (
  <div className="flex flex-col items-center mt-4">
    {posts.map((post) => (
      <ProjectCard
        username={post.username}
        avatar={post.avatar[0].url}
        description={post.description}
        image={post.attachments[0].url}
      />
    ))}
  </div>
)

export default Posts
