import { MiddleWare } from '@/libs/lib'

export const middleware: MiddleWare = (req, res, next) => {
  console.log('Hello World!')
  next()
}
