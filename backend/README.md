# Notes API - Postman Collection

This repository contains a comprehensive Postman collection for testing the Notes API endpoints.

## Files Included

- `postman-collection.json` - Complete API endpoint collection
- `postman-environment.json` - Environment variables for testing
- `README.md` - This file

## Setup Instructions

### 1. Import Collection into Postman

1. Open Postman
2. Click **Import** button (top left)
3. Select `postman-collection.json`
4. Click **Import**

### 2. Import Environment

1. Click the **Environments** icon (left sidebar)
2. Click **Import**
3. Select `postman-environment.json`
4. Click **Import**
5. Select "Notes API Environment" from the environment dropdown (top right)

### 3. Configure Base URL

Update the `baseUrl` variable in the environment to match your server:
- Default: `http://localhost:3000`
- Production: Update to your deployed API URL

## Collection Structure

### 📁 Health Check
- **Health Check** - Verify API server is running

### 📁 Users
- **Create User (Register)** - Create a new account (auto-saves token)
- **Get User** - Fetch authenticated user details
- **Update User** - Update name/email
- **Update User Password** - Change password
- **Delete User** - Remove account

### 📁 Posts
- **Get All Posts** - Retrieve all user posts
- **Get Posts - Filter by Recent** - Order by recent updates
- **Get Posts - Filter by New** - Order by newest first
- **Get Posts - Filter by Old** - Order by oldest first
- **Get Posts - Search** - Search by title/content
- **Create Post** - Create new post (auto-saves postId)
- **Update Post** - Update title and content
- **Update Post - Title Only** - Partial update
- **Delete Post** - Remove post

### 📁 Error Cases
- **Create User - Missing Email** - Validation test
- **Create User - Missing Name** - Validation test
- **Create User - Missing Password** - Validation test
- **Create User - Duplicate Email** - Duplicate entry test
- **Get User - No Auth Token** - Unauthorized access test
- **Get User - Invalid Token** - Invalid token test
- **Get Posts - No Auth Token** - Unauthorized access test
- **Update Post - Invalid Post ID** - Invalid ID test
- **Delete Post - Nonexistent ID** - Non-existent record test

## API Routes Reference

Based on your Express router configuration:

### Health Check
```
GET /health
```

### User Endpoints
```
POST   /create-user         (No auth required)
GET    /get-user            (Auth required)
PUT    /update-user         (Auth required)
DELETE /delete-user         (Auth required)
```

### Post Endpoints
```
GET    /get-posts           (Auth required)
GET    /get-posts?filter[orderby][filter]=recent
GET    /get-posts?filter[orderby][filter]=new
GET    /get-posts?filter[orderby][filter]=old
GET    /get-posts?filter[search]=searchTerm
POST   /create-posts        (No auth required - NOTE: This may be a security concern)
PUT    /update-posts/:id    (Auth required)
DELETE /delete-posts/:id    (Auth required)
```

## Usage Workflow

### Quick Start Testing Flow

1. **Check server health**
   ```
   GET /health
   ```

2. **Register a new user**
   ```
   POST /create-user
   ```
   → Token automatically saved to environment

3. **Get user details**
   ```
   GET /get-user
   ```

4. **Create posts**
   ```
   POST /create-posts
   ```
   → PostId automatically saved

5. **Test filtering and search**
   ```
   GET /get-posts?filter[orderby][filter]=new
   GET /get-posts?filter[search]=keyword
   ```

6. **Update/Delete operations**
   ```
   PUT /update-posts/:id
   DELETE /delete-posts/:id
   ```

### Automated Token Management

The collection automatically handles token storage:
- Create User request saves `authToken` to environment
- Subsequent requests use `{{authToken}}` automatically
- No manual token copying needed!

## Environment Variables

The collection uses these variables:

| Variable | Description | Auto-Set | Usage |
|----------|-------------|----------|-------|
| `baseUrl` | API server URL | Manual | All requests |
| `authToken` | JWT authentication token | ✅ Auto | Auth header |
| `userId` | Current user ID | ✅ Auto | Reference only |
| `postId` | Last created post ID | ✅ Auto | Update/Delete posts |

## Request Examples

### Create User (Register)
```json
POST /create-user
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "user created successfully",
  "token": "eyJhbGc...",
  "data": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
```

### Get User
```
GET /get-user
Headers: Authorization: Bearer {token}
```

### Create Post
```json
POST /create-posts
{
  "title": "My First Note",
  "content": "This is the content of my first note."
}
```

### Update Post
```json
PUT /update-posts/{postId}
Headers: Authorization: Bearer {token}
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Get Posts with Filter
```
GET /get-posts?filter[orderby][filter]=new
GET /get-posts?filter[search]=keyword
```

## Important Notes

### ⚠️ Security Concerns

Based on your routes configuration:

1. **Create Post has NO authentication** - The route `/create-posts` is missing `requireAuth` middleware
   - This means anyone can create posts without being logged in
   - **Recommendation**: Add `requireAuth` middleware to this route

2. **Route method usage** - You're using `router.use()` instead of specific HTTP methods for posts
   - `router.use()` will match ALL HTTP methods (GET, POST, PUT, DELETE, etc.)
   - **Recommendation**: Use specific methods like `router.get()`, `router.post()`, etc.

### Suggested Route Fixes

```typescript
// Current (potential issues)
router.use("/create-posts", createPostController);

// Recommended
router.post("/create-posts", requireAuth, createPostController);
router.get("/get-posts", requireAuth, getPostsController);
router.put("/update-posts/:id", requireAuth, updatePostController);
router.delete("/delete-posts/:id", requireAuth, deletePostController);
```

## Testing Tips

1. **Start with Health Check** - Verify server is running
2. **Create User First** - Run "Create User" to get authentication token
3. **Use Collection Runner** - Select folder → Run to test all endpoints sequentially
4. **Check Tests Tab** - View auto-saved variables after requests
5. **Error Testing** - Use "Error Cases" folder to verify validation
6. **Clean State** - Delete user to reset for fresh testing

## Common Issues & Solutions

### 401 Unauthorized
**Problem:** Request returns "Unauthorized" or "Invalid or expired token"

**Solutions:**
- Ensure you've run "Create User" first
- Check that `authToken` is set in environment variables
- Token may have expired - create a new user or implement refresh tokens
- Verify Authorization header format: `Bearer {token}`

### 404 Not Found
**Problem:** Endpoint not found

**Solutions:**
- Verify `baseUrl` is correct (default: `http://localhost:3000`)
- Check your server is running
- Ensure route paths match exactly (e.g., `/get-user` not `/api/get-user`)

### 400 Bad Request
**Problem:** Validation error

**Solutions:**
- Check request body format (must be valid JSON)
- Verify all required fields are included
- Review field types (e.g., email format, password requirements)

### 500 Internal Server Error
**Problem:** Server error

**Solutions:**
- Check server logs for detailed error messages
- Verify database connection
- Ensure Prisma schema is migrated
- Check environment variables (DATABASE_URL, JWT_SECRET, etc.)

## Advanced Usage

### Running Tests with Newman (CLI)

Install Newman globally:
```bash
npm install -g newman
```

Run the collection:
```bash
newman run postman-collection.json -e postman-environment.json
```

Run with detailed output:
```bash
newman run postman-collection.json -e postman-environment.json --reporters cli,json
```

### Pre-request Scripts

The collection includes test scripts that:
- Automatically save `authToken` from user creation
- Save `postId` from post creation
- Can be extended for additional automation

### Adding Custom Tests

Edit any request and add to the "Tests" tab:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.exist;
});
```

## Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit tokens** - Don't commit environment files with real tokens
2. **Use HTTPS** - Always use HTTPS in production
3. **Rotate secrets** - Regularly update JWT secrets and tokens
4. **Validate input** - Ensure all user input is validated server-side
5. **Rate limiting** - Implement rate limiting to prevent abuse
6. **Fix auth middleware** - Add authentication to `/create-posts` endpoint

## Troubleshooting Checklist

- [ ] Server is running on correct port
- [ ] Database is connected and migrated
- [ ] Environment variables are set (DATABASE_URL, JWT_SECRET)
- [ ] CORS is configured correctly
- [ ] Auth token is valid and not expired
- [ ] Request body is valid JSON
- [ ] Routes match exactly (case-sensitive)

## Project Structure Reference

```
routes.ts
├── GET    /health               (public)
├── POST   /create-user          (public)
├── GET    /get-user             (protected)
├── PUT    /update-user          (protected)
├── DELETE /delete-user          (protected)
├── GET    /get-posts            (protected)
├── POST   /create-posts         (public - SECURITY ISSUE!)
├── PUT    /update-posts/:id     (protected)
└── DELETE /delete-posts/:id     (protected)
```

## Support & Feedback

For issues:
- **API Backend** - Check server logs and database connection
- **Postman Collection** - Verify JSON imports and environment setup
- **Authentication** - Ensure tokens are being saved and sent correctly

## License

This Postman collection is provided as-is for testing purposes.