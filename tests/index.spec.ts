import supertest from 'supertest'
import { app } from '@/app'

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return supertest(app).get('/').expect(200)
  })
})
