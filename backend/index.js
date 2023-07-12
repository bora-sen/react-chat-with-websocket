const { createServer } = require("http")
const httpServer = createServer()

const { Server } = require("socket.io")
const cors = require("cors")

cors({ origin: "*" })
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected!`)

  socket.on("message", (msg) => {
    io.emit("recieve-message", msg)
  })
  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`)
  })
})

io.listen(5000)
