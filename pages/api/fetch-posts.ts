import { NextApiRequest, NextApiResponse } from 'next'
import { fetchPosts } from '../../lib/fetch-posts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await fetchPosts()
  res.json(posts)
}
