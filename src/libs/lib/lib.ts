/* istanbul ignore file */
import fs from 'fs'
import { ExpressPedromdsnLib, MiddleWare } from '@/lib'

import { Router } from 'express'

const router = Router()

const debug = true

const getWebPath = (file: string) => {
  return file.replace('index.ts', '').replace('_middleware.ts', '').replace('.ts', '')
}

interface middlewareType {
  middleware: MiddleWare
  path: string
}

// Cache middlewares
const middlewares = [] as middlewareType[]

const isMiddleware = (file: string) => file === '_middleware.ts'

const getMiddlewares = (path: string) =>
  middlewares.length > 0 ? middlewares.filter((e) => path === getWebPath(e.path))[0] : null

const loadAllFile = async (dir: string) => {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const pathToFile = `${dir}/${file}`
    const absolutePath = pathToFile.split('api')[1]
    const webPath = getWebPath(absolutePath)

    // Verify if file is a directory
    if (fs.lstatSync(`${pathToFile}`).isDirectory()) {
      loadAllFile(`${pathToFile}`)
      continue
    }

    // Exceptions
    // Tests
    if (file.includes('.spec.') || file.includes('.spec.')) continue
    // Services
    if (!isMiddleware(file) && file.startsWith('_')) continue

    // Import the file
    const global: ExpressPedromdsnLib = await import(`@/api/${absolutePath}`)

    // Middlewares
    const middlewareToThisWebPath = getMiddlewares(webPath)

    // Add middleware to cache
    if (isMiddleware(file) && global.middleware) {
      const tempMid = {
        middleware: global.middleware,
        path: webPath,
      }
      middlewares.push(tempMid)
      if (debug) console.log(`Middleware - ${file} - ${webPath}`)
      continue
    }

    // Set middleware to this web path
    if (!isMiddleware(file) && !!middlewareToThisWebPath) {
      router.use(webPath, middlewareToThisWebPath.middleware)
      if (debug) console.log(`Add Middleware to route - ${file} - ${webPath}`)
    }

    if (debug) console.log(`Route - ${file} - ${webPath}`)

    // Methods
    if (global.getMethod) router.get(webPath, global.getMethod)
    if (global.postMethod) router.post(webPath, global.postMethod)
    if (global.putMethod) router.put(webPath, global.putMethod)
    if (global.deleteMethod) router.delete(webPath, global.deleteMethod)
    if (global.headMethod) router.head(webPath, global.headMethod)
    if (global.patchMethod) router.patch(webPath, global.patchMethod)
    if (global.optionsMethod) router.options(webPath, global.optionsMethod)
  }
}

loadAllFile('./src/api')

export { router }
