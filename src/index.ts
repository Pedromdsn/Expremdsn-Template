#!/usr/bin/env ts-node
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv'
import { app } from './app'
import { NextFunction, Request, Response } from 'express'

export interface ExpressPedromdsnLib {
  getMethod?: GetMethod
  postMethod?: PostMethod
  putMethod?: PutMethod
  deleteMethod?: DeleMethod
  middleware?: MiddleWare
}

export type Method = (req: Req, res: Res) => void

export type GetMethod = Method
export type PostMethod = Method
export type PutMethod = Method
export type DeleMethod = Method

export type MiddleWare = (req: Req, res: Res, next: NextFunction) => void

export type Req = Request
export type Res = Response

dotenv.config()
const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`🔥 Server running on port ${port}`))

export default app
