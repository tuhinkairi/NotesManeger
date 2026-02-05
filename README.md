# 📝 Notes Manager API

A robust and scalable RESTful API service for managing personal notes with user authentication, built with modern technologies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.3-purple)](https://www.prisma.io/)

## 🚀 Features

- **User Management**: Complete user registration, authentication, and profile management
- **Note CRUD Operations**: Create, read, update, and delete personal notes
- **JWT Authentication**: Secure token-based authentication system
- **Password Security**: bcrypt hashing for secure password storage
- **Advanced Filtering**: Filter notes by recent, new, or old with search capabilities
- **Rate Limiting**: Built-in request rate limiting for API protection
- **CORS Enabled**: Cross-origin resource sharing support
- **Database ORM**: Prisma ORM with PostgreSQL and Prisma Accelerate
- **Error Handling**: Comprehensive error handling and logging middleware
- **Type Safety**: Full TypeScript implementation for type-safe development

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
  - [Health Check](#health-check)
  - [User Endpoints](#user-endpoints)
  - [Note/Post Endpoints](#notepost-endpoints)
- [Project Structure](#-project-structure)
- [Testing with Postman](#-testing-with-postman)
- [Error Responses](#-error-responses)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe JavaScript |
| **Prisma** | Database ORM |
| **PostgreSQL** | Database |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |
| **express-rate-limit** | Rate limiting middleware |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment configuration |

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher
- **npm** or **yarn**: Package manager
- **PostgreSQL**: Database server (or Prisma Accelerate connection)
- **Git**: Version control

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tuhinkairi/NotesManeger.git
   cd NotesManeger/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration (see [Environment Variables](#-environment-variables))

4. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="your-prisma-database-url-here"

# JWT Configuration
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=4000
NODE_ENV="development"
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Prisma database connection string | `prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-super-secret-key-change-in-production` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` (7 days) |
| `PORT` | Server port number | `4000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🗄 Database Setup

This project uses Prisma with PostgreSQL. The database schema includes:

### User Model
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Note Model
- `id` (UUID, Primary Key)
- `title` (String)
- `content` (String)
- `userId` (UUID, Foreign Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

To set up the database:

1. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

2. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Starts the server with nodemon for auto-restart on file changes.

### Production Mode
1. **Build the TypeScript code**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:4000` (or your specified PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

All endpoints are prefixed with `/api`.

---

### Health Check

#### `GET /health`
Check if the API service is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-05T18:00:00.000Z"
}
```

---

### User Endpoints

#### 1. Create User (Register)

**Endpoint:** `POST /create-user`

**Description:** Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-02-05T18:00:00.000Z",
    "updatedAt": "2024-02-05T18:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "email already registered"
}
```

---

#### 2. Get User

**Endpoint:** `GET /get-user`

**Description:** Retrieve authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-02-05T18:00:00.000Z",
    "updatedAt": "2024-02-05T18:00:00.000Z"
  }
}
```

---

#### 3. Update User

**Endpoint:** `PUT /update-user`

**Description:** Update user profile information.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body (any combination):**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "updatedAt": "2024-02-05T19:00:00.000Z"
  }
}
```

---

#### 4. Update User Password

**Endpoint:** `PUT /update-user`

**Description:** Change user password.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "newSecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

#### 5. Delete User

**Endpoint:** `DELETE /delete-user`

**Description:** Delete user account permanently.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Note/Post Endpoints

#### 1. Create Note

**Endpoint:** `POST /create-posts`

**Description:** Create a new note.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "id": "uuid-here",
    "title": "My First Note",
    "content": "This is the content of my note.",
    "userId": "user-uuid-here",
    "createdAt": "2024-02-05T18:00:00.000Z",
    "updatedAt": "2024-02-05T18:00:00.000Z"
  }
}
```

---

#### 2. Get All Notes

**Endpoint:** `GET /get-posts`

**Description:** Retrieve all notes for the authenticated user.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "Note 1",
      "content": "Content 1",
      "userId": "user-uuid",
      "createdAt": "2024-02-05T18:00:00.000Z",
      "updatedAt": "2024-02-05T18:00:00.000Z"
    },
    {
      "id": "uuid-2",
      "title": "Note 2",
      "content": "Content 2",
      "userId": "user-uuid",
      "createdAt": "2024-02-04T18:00:00.000Z",
      "updatedAt": "2024-02-04T18:00:00.000Z"
    }
  ]
}
```

---

#### 3. Get Notes with Filters

**Endpoint:** `GET /get-posts?filter=<filter-type>`

**Description:** Retrieve notes with specific filtering options.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Query Parameters:**

| Parameter | Type | Options | Description |
|-----------|------|---------|-------------|
| `filter` | string | `recent`, `new`, `old` | Filter notes by time |
| `search` | string | any text | Search in title or content |

**Filter Options:**
- `recent` - Notes ordered by last updated (most recent first)
- `new` - Notes ordered by creation date (newest first)
- `old` - Notes ordered by creation date (oldest first)

**Examples:**

1. **Filter by Recent**
   ```
   GET /get-posts?filter=recent
   ```

2. **Filter by New**
   ```
   GET /get-posts?filter=new
   ```

3. **Filter by Old**
   ```
   GET /get-posts?filter=old
   ```

4. **Search by Title/Content**
   ```
   GET /get-posts?search=important
   ```

**Success Response (200):**
```json
{
  "success": true,
  "data": [...]
}
```

---

#### 4. Update Note

**Endpoint:** `PUT /update-posts/:postId`

**Description:** Update an existing note.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**
- `postId` (string) - UUID of the note to update

**Request Body (any combination):**
```json
{
  "title": "Updated Note Title",
  "content": "Updated content of the note."
}
```

**Example:**
```
PUT /update-posts/daff6376-f3b5-4826-9ae5-00163f14c958
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "id": "daff6376-f3b5-4826-9ae5-00163f14c958",
    "title": "Updated Note Title",
    "content": "Updated content of the note.",
    "userId": "user-uuid-here",
    "updatedAt": "2024-02-05T19:00:00.000Z"
  }
}
```

---

#### 5. Delete Note

**Endpoint:** `DELETE /delete-posts/:postId`

**Description:** Delete a note permanently.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**
- `postId` (string) - UUID of the note to delete

**Example:**
```
DELETE /delete-posts/daff6376-f3b5-4826-9ae5-00163f14c958
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## 📁 Project Structure

```
NotesManeger/
└── backend/
    ├── apijson/                        # Postman collection & environment
    │   ├── Local Project_echoapi_postman.json
    │   └── postman-environment.json
    ├── src/
    │   ├── config.ts                   # Environment configuration
    │   ├── index.ts                    # Application entry point
    │   ├── controllers/                # Request handlers
    │   ├── lib/
    │   │   └── DB.ts                   # Database manager class
    │   ├── middleware/                 # Express middleware
    │   │   ├── auth.middleware.ts
    │   │   ├── error.middleware.ts
    │   │   ├── limiter.middleware.ts
    │   │   ├── logger.middleware.ts
    │   │   └── notfound.middleware.ts
    │   ├── routes/                     # API route definitions
    │   ├── types/                      # TypeScript type definitions
    │   └── utils/                      # Utility functions
    ├── .env.example                    # Environment variables template
    ├── .gitignore                      # Git ignore rules
    ├── nodemon.json                    # Nodemon configuration
    ├── package.json                    # Project dependencies
    ├── prisma.config.ts                # Prisma configuration
    └── tsconfig.json                   # TypeScript configuration
```

### Key Directories

- **`controllers/`**: Business logic and request handling
- **`lib/`**: Database manager with Prisma client
- **`middleware/`**: Authentication, error handling, rate limiting, logging
- **`routes/`**: API endpoint definitions
- **`types/`**: TypeScript interfaces and types
- **`utils/`**: Helper functions and validators

---

## 🧪 Testing with Postman

Postman collection and environment files are available in the `backend/apijson/` directory.

### Import to Postman

1. Open Postman
2. Click **Import** button
3. Navigate to `backend/apijson/`
4. Import both files:
   - `Local Project_echoapi_postman.json` (API collection)
   - `postman-environment.json` (Environment variables)

### Test Flow

1. **Create User** - Registers a new user and auto-saves token
2. **Get User** - Retrieves user profile using saved token
3. **Create Post** - Creates a new note
4. **Get Posts** - Retrieves all notes with optional filters
5. **Update Post** - Modifies an existing note
6. **Delete Post** - Removes a note

The collection includes:
- ✅ All API endpoints
- ✅ Pre-configured requests
- ✅ Test scripts for token management
- ✅ Environment variable automation
- ✅ Error case examples

---

## ❌ Error Responses

### Standard Error Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Request successful |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Missing or invalid authentication token |
| `404` | Not Found | Resource not found |
| `409` | Conflict | Duplicate email registration |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server-side error |

### Error Examples

#### Missing Required Fields
```json
{
  "success": false,
  "message": "name, email, and password are required"
}
```

#### Invalid Authentication
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

#### Duplicate Email
```json
{
  "success": false,
  "message": "email already registered"
}
```

#### Rate Limit Exceeded
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

---

## 🔒 Security

### Implemented Security Features

1. **Password Hashing**: bcrypt with salt rounds for secure password storage
2. **JWT Tokens**: Secure token-based authentication with expiration
3. **Rate Limiting**: Request throttling to prevent abuse
4. **CORS**: Configured cross-origin resource sharing
5. **Environment Variables**: Sensitive data stored in `.env`
6. **Input Validation**: Content validation before database operations
7. **SQL Injection Protection**: Prisma ORM parameterized queries
8. **Error Handling**: Safe error messages without exposing system details

### Security Best Practices

- Never commit `.env` file to version control
- Use strong, unique `JWT_SECRET` in production
- Enable HTTPS in production environments
- Regularly update dependencies
- Implement rate limiting on all endpoints
- Use environment-specific configurations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation for API changes
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Tuhin Kairi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

- **Developer**: [Tuhin Kairi](https://github.com/tuhinkairi)
- **Portfolio**: [https://tuhinkairi.vercel.app/](https://tuhinkairi.vercel.app/)
- **Email**: Create an issue on GitHub for support

---

## 🎯 Roadmap

### Planned Features
- [ ] Password reset functionality via email
- [ ] Note categories/tags
- [ ] Note sharing between users
- [ ] File attachments for notes
- [ ] Rich text editor support
- [ ] Search with advanced filters
- [ ] Note versioning/history
- [ ] API rate limiting per user
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] API documentation with Swagger/OpenAPI

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Authentication with [JWT](https://jwt.io/)
- Password security by [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

<div align="center">
  
**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ by [Tuhin Kairi](https://github.com/tuhinkairi)

</div>
