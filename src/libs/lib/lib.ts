import fs from 'fs'
import { ExpressPedromdsnLib, MiddleWare } from '.'

import { router } from '@/router'

const getWebPath = (file: string) => {
  return file.replace('index.ts', '').replace('_middleware.ts', '').replace('.ts', '')
}

interface middlewareType {
  middleware: MiddleWare
  path: string
}

// Save middlewares
const middlewares = [] as middlewareType[]

export const loadAllFile = async (dir: string) => {
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
    // Testes
    if (file.includes('.spec.ts') || file.includes('.spec.js')) continue

    // Import the file
    const global: ExpressPedromdsnLib = await import(`@/api/${absolutePath}`)

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
