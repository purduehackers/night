import Airtable, { Attachment } from 'airtable'
import { Post } from '../types/types'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})
const base = Airtable.base('appCdXVAcRjUahF5M')

export const fetchPosts = async (): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    base('Scraps')
      .select({
        maxRecords: 3,
        view: 'Grid view',
        sort: [{ field: 'Created time', direction: 'desc' }]
      })
      .firstPage(async (err, records) => {
        if (err) console.log('error', err)
        if (!records) {
          return reject('error')
        }

        const posts: Post[] = records.map((record) => ({
          id: record.id,
          createdTime: record.get('Created time') as string,
          description: record.get('Description') as string,
          attachments: record.get('Attachments') as Attachment[],
          username: record.get('Username (from User)') as string,
          avatar: record.get('Avatar (from User)') as Attachment[]
        }))
        resolve(posts)
      })
  })
