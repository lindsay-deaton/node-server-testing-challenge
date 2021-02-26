const db = require('../../data/db-config.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('shoes')
}

function getById(id) {
  return null
}

async function insert(shoe) {
  const [id] = await db("shoes").insert(shoe)
  return db("shoes")
    .where({ id })
  .first()
}

async function update(id, changes) {
  return db("shoes").update(changes.where({ id })
}

function remove(id) {
  return null
}
