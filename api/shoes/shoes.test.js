const shoes = require("./shoes-model.js")
const db = require("../../data/db-config.js")

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

describe("shoes model", () => {
  describe("insert function", () => {
    it("adds shoes to db", async () => {
      let all
      await shoes.insert(heel)
      all = await db("shoes")
      expect(all).toHaveLength(1)
      await shoes.insert(shoe)
      all = await db("shoes")
      expect(all).toHaveLength(2)
    })
    it("values of shoes from db", async () => {
      const shoe = await shoes.insert(heel)
      expect(shoe).toMatchObject({id:1, ...heel})
    })
  })
})

describe("update function", () => {
  it("updates the shoes", async () => {
    const [id] = await db("shoes").insert(heel)
    //pulls the id of the new shoe that was inserted
    await shoes.update(id, { name: "HEEL" })
    //updated the shoes that were inserted
    const update = await db("shoes").where({ id }).first()
    //give me the shoe that was inserted
    expect(updated.name).toBe("HEEL")
    // was it updated??
  })
  it("check the updated shoe", async () => {
     const [id] = await db("shoes").insert(heel)
    //pulls the id of the new shoe that was inserted
    await shoes.update(id, { name: "HEEL" })
    //updated the shoes that were inserted
    const update = await db("shoes").where({ id }).first()
    //give me the shoe that was inserted
    expect(updated.name).toBe({id:id, name:"HEEL"})
    // was it updated??
  })
})