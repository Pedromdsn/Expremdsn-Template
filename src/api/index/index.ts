import { router } from '@/router'

import { getAll, addOne, getOne } from './services'

router.get('/', getAll)
router.post('/', addOne)
router.get('/:id', getOne)
