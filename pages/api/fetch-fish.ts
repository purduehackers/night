import { NextApiRequest, NextApiResponse } from 'next'
import { fetchFish } from '../../lib/fetch-fish'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const fish = await fetchFish()
  res.json(fish.fish[0])
}
