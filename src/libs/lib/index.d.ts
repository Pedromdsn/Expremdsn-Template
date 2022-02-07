/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'

interface ExpressPedromdsnLib {
  getMethod?: GetMethod
  postMethod?: PostMethod
  putMethod?: PutMethod
  deleteMethod?: DeleMethod
  middleware?: MiddleWare
}

type Method = (req: Req, res: Res) => void

type GetMethod = Method
type PostMethod = Method
type PutMethod = Method
type DeleMethod = Method

type MiddleWare = (req: Req, res: Res, next: NextFunction) => void

type Req = Request
type Res = Response
