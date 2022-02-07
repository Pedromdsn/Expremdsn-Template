import { GetMethod } from '@/libs/lib'

export const get: GetMethod = (req, res) => {
  const { id } = req.params
  res.send(`Hello World! ${id}`)
}
