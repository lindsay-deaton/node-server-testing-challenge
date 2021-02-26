const request = require("supertest")
const db = require("../data/db-config.js")
const server = require("./server.js")

const heel = { name: heel }
const jordan = {name: jordan}

it("correct env", () => {
  expect(process.env.DB_ENV).toBe("testing")
})
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db("shoes").truncate()
})

afterAll(async () => {
  await db.destroy()
})

describe("server", ()=> {
  describe("[GET] /shoes", () => {
    it("responds with 200 status", async () => {
      const res = await request(server).get("/shoes")
      expect(res.status).toBe(200)
    })
    it("returnes correct num of shoes", async () => {
      let res
      await db("shoes").insert(heel)
      res = await request(server).get("/shoes")
      expect(res.body).toHaveLength(1)
    })
    await db("shoes").insert(jordan)
      res = await request(server).get("/shoes")
      expect(res.body).toHaveLength(2)
  })
  it("returns correct shoe format", async () => {
    await db("shoes").insert(heel)
    await db("shoes").insert(jordan)
    const res = await request(server).get("/shoes")
    expect(res.body[0]).toMatchObject({ id: 1, ...heel })
    expect(res.body[1]).toMatchObject({id:2, ...jordan})
  })
})

describe("[POST] /shoes", () => {
  it("responds with newly created shoes", async () => {
    let res
    res = await request(server).post("/shoes").send(heel)
    expect(res.body).toMatchObject({ id: 1, ...heel })
    res = await request(server).post("/shoes").send(jordan)
    expect(res.body).toMatchObject({ id: 2, ...jordan })
  })
})