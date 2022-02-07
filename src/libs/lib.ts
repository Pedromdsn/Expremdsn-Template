import fs from 'fs'

import { router } from '../router'
import { ExpressPedromdsnLib, MiddleWare } from 'src/@types'

export const getWebPath = (file: string) => {
  return file.replace('index.ts', '').replace('_middleware.ts', '').replace('.ts', '')
}

export interface middlewareType {
  middleware: MiddleWare
  path: string
}

const middlewares = [] as middlewareType[]

export const loadAllFile = async (dir: string) => {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const pathToFile = `${dir}/${file}`
    const absolutePath = pathToFile.split('api')[1]
    const webPath = getWebPath(absolutePath)

    if (fs.lstatSync(`${pathToFile}`).isDirectory()) {
      loadAllFile(`${pathToFile}`)
      continue
    }

    // Import the file
    const global: ExpressPedromdsnLib = await import(`../../../src/api/${absolutePath}`)

    // Middlewares
    const middlewareToThisWebPath =
      middlewares.length > 0 ? middlewares.filter((e) => webPath === getWebPath(e.path))[0] : null

    if (file !== '_middleware.ts' && !!middlewareToThisWebPath) {
      router.use(webPath, middlewareToThisWebPath.middleware)
    }

    if (file === '_middleware.ts' && global.middleware) {
      const tempMid = {
        middleware: global.middleware,
        path: webPath,
      }
      middlewares.push(tempMid)
      continue
    }

    // Methods
    if (global.getMethod) router.get(webPath, global.getMethod)
    if (global.postMethod) router.post(webPath, global.postMethod)
    if (global.putMethod) router.put(webPath, global.putMethod)
    if (global.deleteMethod) router.delete(webPath, global.deleteMethod)
  }
}
