/** @format */

export type User = {
  key: number
  name: string
  email: string
  role: 'user' | 'admin'
  active: boolean
}
