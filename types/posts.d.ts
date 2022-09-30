import { Attachment } from 'airtable'

interface AirtableAttachment {
  id: string
  size: number
  width: number
  height: number
  url: string
  type: string
  filename: string
}

interface Post {
  createdTime: string
  description: string
  attachments: Attachment[]
  username: string
  avatar: Attachment[]
}
