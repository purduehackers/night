import { Attachment } from 'airtable'

interface Post {
  createdTime: string
  description: string
  attachments: Attachment[]
  username: string
  avatar: Attachment[]
}

interface Fish {
  createdTime: string
  fish: Attachment[]
}
