import { Middleware } from '@/lib'

export const middleware: Middleware = (req, res, next) => {
  console.log('Hello World!')
  next()
}
