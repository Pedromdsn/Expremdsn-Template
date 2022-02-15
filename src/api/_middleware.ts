import { Middleware } from 'expremdsn'

export const middleware: Middleware = (req, res, next) => {
  console.log('Hello World!')
  next()
}
