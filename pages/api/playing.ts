import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import getAccessToken from '../../utils/get-access-token'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (token) {
    //@ts-ignore
    const { access_token } = await getAccessToken(token.accessToken)

    const data = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      }
    ).then((r) => (r.status !== 200 ? undefined : r.json()))
    if (!data) {
      return res.json({
        title: 'Not playing',
        artist: 'Not playing',
        image:
          'https://collegian.com/wp-content/uploads/2017/08/spotify-1759471_1280.jpg'
      })
    }
    const { name: title, artists } = data.item
    const image = data.item.album.images[0].url
    //@ts-ignore
    const _artists = artists.map(({ name }) => name)
    const artist = _artists.length > 1 ? _artists.join(', ') : _artists[0]

    return res.json({ title, artist, image })
  } else {
    return res.json({ data: 'Not signed in' })
  }
}
