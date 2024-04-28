export interface User {
  name: string
  email: string
  avatar?: string // изображение
  password: string
  status: 'common' | 'pro'
}