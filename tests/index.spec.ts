import supertest from 'supertest';
import { app} from "@/src/app"

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});