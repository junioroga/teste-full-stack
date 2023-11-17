export type User = {
  id: number
  name: string
  email: string
  address: string
  birthdate: string
  created_at: Date
}

export interface ResponseUserList {
  users: User[]
  pagination: {
    next: number
    previous?: number
  }
  totalPages: number
}
