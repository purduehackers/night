import Airtable, { Attachment } from 'airtable'
import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../types/posts'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})
const base = Airtable.base('appCdXVAcRjUahF5M')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  base('Scraps')
    .select({
      maxRecords: 3,
      view: 'Grid view',
      sort: [{ field: 'Created time', direction: 'desc' }]
    })
    .firstPage(async (err, records) => {
      if (err) console.log('error', err)
      if (!records) {
        return res.status(404).send('no records found')
      }

      const posts: Post[] = records.map((record) => ({
        id: record.id,
        createdTime: record.get('Created time') as string,
        description: record.get('Description') as string,
        attachments: record.get('Attachments') as Attachment[],
        username: record.get('Username (from User)') as string,
        avatar: record.get('Avatar (from User)') as Attachment[]
      }))
      return res.json(posts)
    })
}
