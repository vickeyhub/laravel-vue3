# Admin Authentication API Documentation

## Base URL
```
/api/admin/auth
```

## Authentication
All protected endpoints require Bearer token in Authorization header:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Login
**POST** `/api/admin/auth/login`

**Request Body:**
```json
{
    "email": "admin@example.com",
    "password": "password123"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Admin User",
            "email": "admin@example.com",
            "is_admin": true
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "token_type": "Bearer"
    }
}
```

**Error Response (401):**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

---

### 2. Register
**POST** `/api/admin/auth/register`

**Request Body:**
```json
{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Success Response (201):**
```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Admin User",
            "email": "admin@example.com",
            "is_admin": true
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "token_type": "Bearer"
    }
}
```

**Error Response (422):**
```json
{
    "success": false,
    "message": "Validation error",
    "errors": {
        "email": ["The email has already been taken."]
    }
}
```

---

### 3. Get Current User
**GET** `/api/admin/user`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "Admin User",
            "email": "admin@example.com",
            "is_admin": true
        }
    }
}
```

---

### 4. Logout
**POST** `/api/admin/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---

### 5. Forgot Password
**POST** `/api/admin/auth/forgot-password`

**Request Body:**
```json
{
    "email": "admin@example.com"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "message": "Password reset link sent to your email"
}
```

---

### 6. Reset Password
**POST** `/api/admin/auth/reset-password`

**Request Body:**
```json
{
    "email": "admin@example.com",
    "token": "reset-token-from-email",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "message": "Password reset successfully"
}
```

**Error Response (400):**
```json
{
    "success": false,
    "message": "Invalid or expired reset token"
}
```

---

## Flutter Integration

### Example Flutter Code

```dart
// Login Example
Future<Map<String, dynamic>> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://your-domain.com/api/admin/auth/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'email': email,
      'password': password,
    }),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    if (data['success']) {
      // Store token
      final token = data['data']['token'];
      // Store user data
      final user = data['data']['user'];
      return {'success': true, 'token': token, 'user': user};
    }
  }
  return {'success': false, 'message': 'Login failed'};
}

// Authenticated Request Example
Future<Map<String, dynamic>> getCurrentUser(String token) async {
  final response = await http.get(
    Uri.parse('https://your-domain.com/api/admin/user'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return data;
  }
  return {'success': false};
}
```

---

## Vue.js Routes

- `/admin/login` - Login Page
- `/admin/register` - Registration Page
- `/admin/forgot-password` - Forgot Password Page
- `/admin/reset-password` - Reset Password Page
- `/admin/home` - Dashboard (Protected)
- `/admin/*` - All other admin routes (Protected)

---

## Security Notes

1. **Token Storage**: Tokens are stored in localStorage for web, use secure storage for mobile
2. **Token Expiration**: Configure in `config/sanctum.php`
3. **CORS**: Configure CORS for Flutter/mobile apps in `config/cors.php`
4. **Admin Check**: All endpoints verify `is_admin = true`
5. **Password Requirements**: Minimum 8 characters for registration

---

## Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:8000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get User (with token)
curl -X GET http://localhost:8000/api/admin/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Next Steps for Flutter

1. Configure CORS in `config/cors.php`
2. Add API base URL configuration
3. Implement token refresh mechanism (if needed)
4. Add rate limiting for production

