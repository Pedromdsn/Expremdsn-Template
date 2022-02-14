import { Middleware } from '@/libs/lib'

export const middleware: Middleware = (req, res, next) => {
  console.log('Hello World!')
  next()
}
