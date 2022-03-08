import expremdsn from 'expremdsn'
import cors from 'cors'

import { router } from 'expremdsn'

const app = expremdsn()

app.use(expremdsn.json())
app.use(cors())
app.use(router)

export { app }
