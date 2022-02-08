import { Router } from 'express'
import { loadAllFile } from '@/libs/lib/lib'

const app = Router()

loadAllFile('./src/api')

export { app as router }
