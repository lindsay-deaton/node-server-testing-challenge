const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const shoesRouter = require("./shoes/shoes-router.js")
const authRouter = require("./auth/auth-router.js")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use("/api/shoes", shoesRouter)
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" })
})

module.exports = server;

