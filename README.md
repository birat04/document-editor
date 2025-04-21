# Document Editor

A real-time collaborative document editor built with React, Node.js, Socket.io, and MongoDB. This application allows multiple users to edit documents simultaneously with features like rich text editing, document sharing, and real-time updates.

## Features

- Real-time collaborative editing
- Rich text formatting with Quill editor
- Document creation and management
- Auto-save functionality
- Document title editing
- Responsive design
- Document list view with last updated timestamps

## Tech Stack

- **Frontend:**
  - React.js
  - Socket.io-client
  - Quill Rich Text Editor
  - React Router
  - Axios

- **Backend:**
  - Node.js
  - Express.js
  - Socket.io
  - MongoDB
  - Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd document-editor
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Configuration

1. Create a `.env` file in the client directory:
```
SKIP_PREFLIGHT_CHECK=true
```

2. Make sure MongoDB is running on your local machine:
```bash
mongod
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
document-editor/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # React components
│       ├── styles/        # CSS files
│       └── App.js         # Main application component
└── server/                # Node.js backend
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    └── server.js          # Server entry point
```

## API Endpoints

- `GET /documents` - Get all documents
- `DELETE /documents/:id` - Delete a document
- WebSocket events for real-time collaboration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Quill.js for the rich text editor
- Socket.io for real-time communication
- MongoDB for database storage
