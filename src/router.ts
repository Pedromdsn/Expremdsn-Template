import { Router } from 'express'
import fs from 'fs'

export const app = Router()

const dir = fs.readdirSync('./src/api')

for (const file of dir) import(`@/api/${file}`)

export { app as router }
