import { Request, Response } from 'express'
import { prisma } from '@/libs/prisma'

export const getAll = (req: Request, res: Response) => {
  const data = prisma.users.findMany()
  res.send(data)
}

export const addOne = (req: Request, res: Response) => {
  res.send('Hello World!')
}

export const getOne = (req: Request, res: Response) => {
  res.send('Hello World!')
}
