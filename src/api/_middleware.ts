import { MiddleWare } from '@/libs/lib'

export const middleware: MiddleWare = (req, res, next) => {
  console.log('1')
  next()
}
