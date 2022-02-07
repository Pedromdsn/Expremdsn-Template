import { Req, Res } from '@/libs/lib'

export const getMethod = (req: Req, res: Res) => {
  res.send('Hello World!!!')
}
