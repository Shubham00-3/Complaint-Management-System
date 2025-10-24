# API Documentation

Complete API documentation for the Complaint Management System.

## Base URL

- **Local Development**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

## Authentication

The API uses JWT tokens stored in httpOnly cookies for authentication. After successful login, the token is automatically included in subsequent requests.

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // Optional: "user" (default) or "admin"
}
```

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Error Responses**:
- **400 Bad Request**: Missing required fields
```json
{
  "error": "Email, password, and name are required"
}
```

- **409 Conflict**: User already exists
```json
{
  "error": "User with this email already exists"
}
```

---

### Login

Authenticate a user and receive a JWT token.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Note**: JWT token is set as an httpOnly cookie named `auth_token`.

**Error Responses**:
- **400 Bad Request**: Missing credentials
```json
{
  "error": "Email and password are required"
}
```

- **401 Unauthorized**: Invalid credentials
```json
{
  "error": "Invalid email or password"
}
```

---

### Logout

Clear authentication cookie and log out user.

**Endpoint**: `POST /api/auth/logout`

**Authentication**: Not required

**Success Response** (200):
```json
{
  "message": "Logout successful"
}
```

---

### Get Current User

Retrieve information about the currently authenticated user.

**Endpoint**: `GET /api/auth/me`

**Authentication**: Required

**Success Response** (200):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Error Responses**:
- **401 Unauthorized**: Not authenticated
```json
{
  "error": "Not authenticated"
}
```

- **404 Not Found**: User not found
```json
{
  "error": "User not found"
}
```

---

## Complaint Endpoints

### Get All Complaints

Retrieve all complaints with optional filtering.

**Endpoint**: `GET /api/complaints`

**Authentication**: Required (Admin only)

**Query Parameters**:
- `status` (optional): Filter by status - `Pending`, `In Progress`, `Resolved`, or `all`
- `priority` (optional): Filter by priority - `Low`, `Medium`, `High`, or `all`

**Example Requests**:
```
GET /api/complaints
GET /api/complaints?status=Pending
GET /api/complaints?priority=High
GET /api/complaints?status=In Progress&priority=High
```

**Success Response** (200):
```json
{
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Product not working",
      "description": "The product stopped working after 2 days",
      "category": "Product",
      "priority": "High",
      "status": "Pending",
      "dateSubmitted": "2024-01-15T10:30:00.000Z",
      "userId": "507f1f77bcf86cd799439012",
      "userEmail": "user@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Responses**:
- **401 Unauthorized**: Not authenticated
```json
{
  "error": "Unauthorized"
}
```

- **403 Forbidden**: Not an admin
```json
{
  "error": "Forbidden: Admin access required"
}
```

---

### Create Complaint

Submit a new complaint.

**Endpoint**: `POST /api/complaints`

**Authentication**: Required (Any authenticated user)

**Request Body**:
```json
{
  "title": "Product not working",
  "description": "The product stopped working after 2 days of use. I tried troubleshooting but nothing works.",
  "category": "Product",
  "priority": "High"
}
```

**Field Validation**:
- `title`: Required, string
- `description`: Required, string
- `category`: Required, one of: `"Product"`, `"Service"`, `"Support"`
- `priority`: Required, one of: `"Low"`, `"Medium"`, `"High"`

**Success Response** (201):
```json
{
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Product not working",
    "description": "The product stopped working after 2 days",
    "category": "Product",
    "priority": "High",
    "status": "Pending",
    "dateSubmitted": "2024-01-15T10:30:00.000Z",
    "userId": "507f1f77bcf86cd799439012",
    "userEmail": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Side Effects**:
- An email notification is sent to the admin
- Complaint status is automatically set to `"Pending"`

**Error Responses**:
- **400 Bad Request**: Missing or invalid fields
```json
{
  "error": "All fields are required"
}
```

- **401 Unauthorized**: Not authenticated
```json
{
  "error": "Unauthorized"
}
```

---

### Update Complaint

Update a complaint's status.

**Endpoint**: `PATCH /api/complaints/[id]`

**Authentication**: Required (Admin only)

**URL Parameters**:
- `id`: MongoDB ObjectId of the complaint

**Request Body**:
```json
{
  "status": "In Progress"
}
```

**Valid Status Values**:
- `"Pending"`
- `"In Progress"`
- `"Resolved"`

**Success Response** (200):
```json
{
  "message": "Complaint updated successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Product not working",
    "description": "The product stopped working after 2 days",
    "category": "Product",
    "priority": "High",
    "status": "In Progress",
    "dateSubmitted": "2024-01-15T10:30:00.000Z",
    "userId": "507f1f77bcf86cd799439012",
    "userEmail": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Side Effects**:
- If status changed, an email notification is sent to the admin

**Error Responses**:
- **400 Bad Request**: Missing status
```json
{
  "error": "Status is required"
}
```

- **401 Unauthorized**: Not authenticated
```json
{
  "error": "Unauthorized"
}
```

- **403 Forbidden**: Not an admin
```json
{
  "error": "Forbidden: Admin access required"
}
```

- **404 Not Found**: Complaint doesn't exist
```json
{
  "error": "Complaint not found"
}
```

---

### Delete Complaint

Delete a complaint permanently.

**Endpoint**: `DELETE /api/complaints/[id]`

**Authentication**: Required (Admin only)

**URL Parameters**:
- `id`: MongoDB ObjectId of the complaint

**Success Response** (200):
```json
{
  "message": "Complaint deleted successfully"
}
```

**Error Responses**:
- **401 Unauthorized**: Not authenticated
```json
{
  "error": "Unauthorized"
}
```

- **403 Forbidden**: Not an admin
```json
{
  "error": "Forbidden: Admin access required"
}
```

- **404 Not Found**: Complaint doesn't exist
```json
{
  "error": "Complaint not found"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong",
  "details": "Additional technical details (only in development)"
}
```

### Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists
- **500 Internal Server Error**: Server error

---

## Request Examples

### Using cURL

**Register a User**:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Complaint** (with authentication):
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Product Issue",
    "description": "Detailed description here",
    "category": "Product",
    "priority": "High"
  }'
```

**Get All Complaints** (admin):
```bash
curl -X GET http://localhost:3000/api/complaints \
  -b cookies.txt
```

**Update Complaint Status** (admin):
```bash
curl -X PATCH http://localhost:3000/api/complaints/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "Resolved"
  }'
```

**Delete Complaint** (admin):
```bash
curl -X DELETE http://localhost:3000/api/complaints/507f1f77bcf86cd799439011 \
  -b cookies.txt
```

### Using JavaScript (fetch)

**Login and Create Complaint**:
```javascript
// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const loginData = await loginResponse.json();

// Create complaint (cookie is automatically sent)
const complaintResponse = await fetch('/api/complaints', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Product Issue',
    description: 'Detailed description',
    category: 'Product',
    priority: 'High'
  })
});

const complaintData = await complaintResponse.json();
```

---

## Rate Limiting

Currently, there are no rate limits implemented. For production use, consider implementing rate limiting to prevent abuse.

---

## Data Models

### User Model

```typescript
{
  _id: ObjectId
  email: string (unique, lowercase)
  password: string (hashed)
  name: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Complaint Model

```typescript
{
  _id: ObjectId
  title: string
  description: string
  category: 'Product' | 'Service' | 'Support'
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'In Progress' | 'Resolved'
  dateSubmitted: Date
  userId: ObjectId (reference to User)
  userEmail: string
  createdAt: Date
  updatedAt: Date
}
```

---

## Email Notifications

### New Complaint Email

**Triggered**: When a user creates a new complaint

**Recipient**: Admin email (from `ADMIN_EMAIL` environment variable)

**Content**:
- Complaint title
- Category
- Priority (color-coded)
- Description
- User email
- Date submitted

### Status Update Email

**Triggered**: When an admin updates a complaint's status

**Recipient**: Admin email (from `ADMIN_EMAIL` environment variable)

**Content**:
- Complaint title
- Old status → New status
- Date updated

---

## Security Considerations

### Authentication
- Passwords are hashed using bcryptjs with 10 salt rounds
- JWT tokens are stored in httpOnly cookies (XSS protection)
- Tokens expire after 7 days
- Secure flag is enabled in production (HTTPS only)

### Authorization
- Role-based access control (user vs admin)
- Middleware protects admin-only routes
- API endpoints verify user roles before operations

### Input Validation
- All required fields are validated
- Category and priority values are restricted to enums
- Email addresses are validated and normalized
- Mongoose schema validation on database level

### Best Practices
- Use HTTPS in production
- Keep dependencies updated
- Store sensitive data in environment variables
- Never commit `.env.local` to version control
- Regularly rotate JWT secrets
- Monitor for suspicious activity

---

## Testing

### Test User Flow

1. Register a user
2. Login with user credentials
3. Create a complaint
4. Verify email notification received

### Test Admin Flow

1. Create an admin user
2. Login with admin credentials
3. List all complaints
4. Update complaint status
5. Verify email notification received
6. Delete a complaint

### Integration Testing Example

```javascript
// Jest/Vitest test example
describe('Complaints API', () => {
  it('should create a complaint', async () => {
    const response = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Complaint',
        description: 'Test description',
        category: 'Product',
        priority: 'Low'
      })
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.complaint).toHaveProperty('_id');
  });
});
```

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- User authentication with JWT
- CRUD operations for complaints
- Email notifications via SendGrid
- Admin dashboard
- Status and priority filtering

---

For issues or questions, please refer to the main README.md or open an issue on GitHub.


