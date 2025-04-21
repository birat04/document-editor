const express = require("express")
const mongoose = require("mongoose")
const Document = require("./Document")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
  console.error("MongoDB connection error:", err)
  process.exit(1)
})

const server = require("http").createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

// API Routes
app.get("/documents", async (req, res) => {
  try {
    const documents = await Document.find().sort({ updatedAt: -1 })
    res.json(documents)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" })
  }
})

app.delete("/documents/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id)
    res.json({ message: "Document deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document" })
  }
})

// Socket.io connection handling
io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, {
        data: data.data,
        title: data.title,
        updatedAt: Date.now()
      })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ 
    _id: id, 
    data: defaultValue,
    title: "Untitled Document",
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
}

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
