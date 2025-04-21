import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import TextEditor from "./TextEditor"
import "./styles.css"
import axios from "axios"

function Home() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/documents")
        setDocuments(response.data)
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  return (
    <div className="home">
      <h1>Document Editor</h1>
      <div className="document-list">
        <Link to="/documents/new" className="new-doc-btn">
          Create New Document
        </Link>
        {loading ? (
          <p>Loading documents...</p>
        ) : (
          <div className="documents-grid">
            {documents.map(doc => (
              <Link
                key={doc._id}
                to={`/documents/${doc._id}`}
                className="document-card"
              >
                <h3>{doc.title}</h3>
                <p className="document-date">
                  Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="/documents/new" element={<TextEditor />} />
      </Routes>
    </Router>
  )
}

export default App
