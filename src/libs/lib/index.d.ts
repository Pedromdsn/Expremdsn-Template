import { NextFunction, Request, Response } from 'express'

export interface ExpressPedromdsnLib {
  middleware?: MiddleWare
  getMethod?: GetMethod
  postMethod?: PostMethod
  putMethod?: PutMethod
  deleteMethod?: DeleteMethod
  headMethod?: HeadMethod
  patchMethod?: PatchMethod
  optionsMethod?: OptionsMethod
}

export type Method = (req: Req, res: Res) => void

export type GetMethod = Method
export type PostMethod = Method
export type PutMethod = Method
export type DeleteMethod = Method
export type HeadMethod = Method
export type OptionsMethod = Method
export type PatchMethod = Method

export type MiddleWare = (req: Req, res: Res, next: NextFunction) => void

export type Req = Request
export type Res = Response
