# API Integration Guide for Backend Developers

## Overview

The login flow is currently implemented with **simulated API calls for demo purposes**. This guide shows how to replace the simulation with real API integration.

## File to Modify

**`/js/pages/login.js`** - Look for the `authenticateUser()` method

---

## Step 1: Replace Simulated API Call

### Current Code (Demo - Lines 130-165)

```javascript
async authenticateUser(email, password) {
  // ============================================================
  // TODO: BACKEND INTEGRATION
  // Replace this simulation with your actual API call
  // ============================================================

  // DEMO ONLY: Remove everything below this line
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated responses...
    }, 800);
  });
}
```

### Replace With Your API Call

```javascript
async authenticateUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
    signal: AbortSignal.timeout(30000) // 30 second timeout
  });

  // Handle HTTP errors
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return await response.json();
}
```

---

## Step 2: Backend API Response Format

Your backend API should return responses in this format:

### Success Response (HTTP 200)

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### Authentication Failed Response (HTTP 401)

```json
{
  "success": false,
  "message": "Invalid email or password. Please try again.",
  "type": "AUTH_FAILED"
}
```

### Timeout Error (HTTP 408 or Request Timeout)

```json
{
  "success": false,
  "message": "Request timeout",
  "type": "TIMEOUT"
}
```

### Server Error (HTTP 500)

```json
{
  "success": false,
  "message": "Internal server error",
  "type": "SERVER_ERROR"
}
```

---

## Step 3: Error Handling - What Shows Which Error UI?

The frontend automatically shows the correct error UI based on error types:

| Error Type | Frontend Behavior | User Sees |
|------------|------------------|-----------|
| `TIMEOUT` | Redirects to email page with red banner | "Your log in attempt timed out. Please try again" |
| `SERVER_ERROR` | Redirects to error page | Full page: "Something is not right" |
| Network error (no response) | Redirects to error page | Full page: "Something is not right" |
| `AUTH_FAILED` | Shows inline error below password field | "Invalid email or password. Please try again." |
| Empty email | Shows red border + helper text | "Please enter an email address" |
| Invalid email format | Shows pink background + helper text | "Invalid email address. Please enter a valid email address." |
| Empty password | Shows inline error | "Please enter your password" |

---

## Step 4: Testing Your API Integration

### 1. Test Successful Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Expected:** User redirected to `/pages/User/landing-user.html`

### 2. Test Invalid Credentials
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"wrong"}'
```

**Expected:** Inline error message "Invalid email or password"

### 3. Test Timeout
Configure your API to delay response by 30+ seconds.

**Expected:** Red banner "Your log in attempt timed out. Please try again"

### 4. Test Server Error
Return HTTP 500 from your API.

**Expected:** Error page "Something is not right"

---

## Step 5: Optional Customizations

### Change Timeout Duration

In `authenticateUser()`, modify the timeout:

```javascript
signal: AbortSignal.timeout(30000) // Change 30000 to your preferred milliseconds
```

### Change Error Messages

In `handleAuthenticationError()`, modify error messages:

```javascript
errorMessage.textContent = 'Your custom error message here';
```

### Add Additional User Data

If your API returns more user data (avatar, role, etc.), update the localStorage storage:

```javascript
// In handleAuthenticationResult()
localStorage.setItem('user', JSON.stringify({
  name: result.user.name,
  email: result.user.email,
  avatar: result.user.avatar,  // Add additional fields
  role: result.user.role        // Add additional fields
}));
```

---

## Step 6: Remove Demo Code

Once integrated, **remove these lines** from `login.js`:

1. Lines 130-165: The entire `return new Promise(...)` simulation block
2. All comments that say "DEMO ONLY" or "REMOVE IN PRODUCTION"

---

## Error UI Screenshots Reference

1. **Empty Field Error** - Gray background, red border, helper text below
2. **Invalid Email Error** - Pink background, red border, helper text below
3. **Timeout Error** - Red banner above email input
4. **Client-Side Error** - Full page with error icon and buttons

---

## Support

If you encounter issues during integration:
1. Check browser console for detailed error logs
2. Verify API response format matches the specification above
3. Test error types individually using the curl commands above

---

## Quick Checklist

- [ ] Replace `authenticateUser()` method with real API call
- [ ] Verify API returns correct response format for success
- [ ] Verify API returns correct error types (TIMEOUT, SERVER_ERROR, AUTH_FAILED)
- [ ] Test all 4 error states work correctly
- [ ] Remove demo simulation code
- [ ] Test with real backend endpoint
- [ ] Verify timeout handling (30 second default)
- [ ] Confirm user data is stored correctly in localStorage
