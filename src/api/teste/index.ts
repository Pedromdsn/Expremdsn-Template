import { GetMethod, PostMethod } from '@/libs/lib'

export const getMethod: GetMethod = (req, res) => {
  res.send('Hello World!')
}

export const postMethod: PostMethod = (req, res) => {
  res.send('Hello World! Post')
}
