import Airtable, { Attachment } from 'airtable'
import { Fish } from '../types/types'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})
const base = Airtable.base('appCdXVAcRjUahF5M')

export const fetchFish = async (): Promise<Fish> =>
  new Promise((resolve, reject) => {
    base('Fish of the Day')
      .select({
        maxRecords: 1,
        view: 'Grid view',
        sort: [{ field: 'Created time', direction: 'desc' }]
      })
      .firstPage(async (err, records) => {
        if (err) console.log('error', err)
        if (!records) {
          return reject('error')
        }

        const fish: Fish[] = records.map((record) => ({
          id: record.id,
          createdTime: record.get('Created time') as string,
          fish: record.get('Fish') as Attachment[]
        }))
        resolve(fish[0])
      })
  })
