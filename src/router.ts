import { Router } from 'express'
import { loadAllFile } from '@/lib/lib'

const app = Router()

loadAllFile('./src/api')

// app.get('/teste/:id', (req, res) => {
//   const { id } = req.params
//   res.send(`Hello World! ${id}`)
// })

export { app as router }
