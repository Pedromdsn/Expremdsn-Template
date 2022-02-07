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
