# CORS and Credentials Configuration Guide

## The Problem

When using `credentials: "include"` in frontend fetch requests, you were getting this CORS error:

```
Access to fetch at 'https://car-services-iafh.onrender.com/api/me' from origin 'https://car-services-azure.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.
```

## Why This Happens

When you use `credentials: "include"` in your fetch requests (to send cookies/sessions across domains):

1. **Browser Security:** Browsers enforce strict CORS policies for credentialed requests
2. **Backend Must Explicitly Allow:** The server MUST respond with `Access-Control-Allow-Credentials: true`
3. **No Wildcards:** You CANNOT use `origin: "*"` when credentials are involved
4. **Specific Origin:** Backend must specify the EXACT frontend origin

## The Solution

### ✅ Backend Changes (server.js)

**1. Added `credentials: true` to CORS:**
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://car-services-azure.vercel.app'],
  credentials: true, // ← THIS IS CRITICAL!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
```

**2. Updated Session Cookie Settings:**
```javascript
app.use(session({
  secret: process.env.SESSION_SECRET || 'car-rental-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none', // ← Required for cross-site cookies
    domain: undefined // ← Let browser auto-detect
  }
}));
```

## Environment Variables for Deployment

### Backend (Render.com)

Set these environment variables on Render:

```env
NODE_ENV=production
SESSION_SECRET=your-secure-random-secret-key-here
MONGODB_URL=mongodb+srv://atulkesharwani7974:Atul7974@cluster0.magjk.mongodb.net/car-rental
PORT=5000
```

**Important:** When `NODE_ENV=production`:
- Cookies become `secure: true` (HTTPS only)
- `sameSite: 'none'` (allows cross-domain)
- Proper CORS headers are set

### Frontend (Vercel)

Set this environment variable:

```env
NEXT_PUBLIC_API_URL=https://car-services-iafh.onrender.com
```

## Cookie Settings Explained

### `sameSite` Options:

| Value | Behavior | Use Case |
|-------|----------|----------|
| `'strict'` | Cookie only sent to same site | Single domain apps |
| `'lax'` | Cookie sent on top-level navigation | Same-domain with external links |
| `'none'` | Cookie sent everywhere | **Cross-domain apps** ← You need this! |

**Note:** `sameSite: 'none'` REQUIRES `secure: true` (HTTPS)

### `secure` Flag:

- `true` → Cookie only sent over HTTPS
- `false` → Cookie sent over HTTP (localhost only)

### `httpOnly` Flag:

- `true` → Cookie cannot be accessed by JavaScript (prevents XSS attacks)
- `false` → JavaScript can read the cookie

## Testing in Different Environments

### Local Development (Both on localhost)

**Frontend:** `http://localhost:3000`
**Backend:** `http://localhost:5000`

```javascript
// Backend CORS
origin: 'http://localhost:3000',
credentials: true

// Cookie settings
secure: false, // HTTP is OK locally
sameSite: 'lax' // Same site locally
```

### Production (Different Domains)

**Frontend:** `https://car-services-azure.vercel.app`
**Backend:** `https://car-services-iafh.onrender.com`

```javascript
// Backend CORS
origin: 'https://car-services-azure.vercel.app',
credentials: true

// Cookie settings
secure: true, // HTTPS required
sameSite: 'none' // Cross-site required
```

## Common Pitfalls

### ❌ Don't Do This:

```javascript
// Will NOT work with credentials
app.use(cors({
  origin: '*', // ← NO! Cannot use wildcard
  credentials: true
}));
```

```javascript
// Missing credentials flag
app.use(cors({
  origin: 'https://frontend.com'
  // credentials: true ← MISSING! Will fail
}));
```

### ✅ Do This:

```javascript
app.use(cors({
  origin: ['https://frontend.com', 'http://localhost:3000'],
  credentials: true, // ← Must be present
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
```

## Debugging CORS Issues

### Check Response Headers

In browser DevTools → Network tab → Click request → Check Headers:

**Should see:**
```
Access-Control-Allow-Origin: https://car-services-azure.vercel.app
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

### Check Cookie

In DevTools → Application tab → Cookies:

**Should see:**
```
Name: connect.sid (or your session name)
Domain: car-services-iafh.onrender.com
Secure: ✓ (if HTTPS)
HttpOnly: ✓
SameSite: None
```

## Alternative: Use Proxy (If CORS Still Fails)

If you continue having CORS issues, you can use Next.js rewrites:

**next.config.ts:**
```typescript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://car-services-iafh.onrender.com/api/:path*'
      }
    ];
  }
};
```

Then in frontend, use:
```javascript
// Instead of https://backend.com/api/login
fetch('/api/login', {
  method: 'POST',
  credentials: 'include',
  // ...
});
```

This makes requests appear same-origin, avoiding CORS entirely.

## Security Considerations

### Production Checklist:

- ✅ Set `NODE_ENV=production`
- ✅ Use HTTPS for both frontend and backend
- ✅ Set strong `SESSION_SECRET` (random 32+ characters)
- ✅ Enable `httpOnly` cookies (prevent XSS)
- ✅ Enable `secure` cookies (HTTPS only)
- ✅ Set `sameSite: 'none'` for cross-domain
- ✅ Specify exact origins (no wildcards)
- ✅ Use environment variables (never hardcode secrets)

## Summary

**The fix required 3 changes:**

1. ✅ Added `credentials: true` to CORS config
2. ✅ Added `sameSite: 'none'` to cookie settings (production)
3. ✅ Ensured `secure: true` in production (HTTPS)

After deploying these changes to Render, your CORS error should be resolved and sessions will work across domains!

## Deploy Instructions

1. **Push backend changes to Git**
2. **Render will auto-deploy** (if connected to GitHub)
3. **Verify environment variables** are set on Render
4. **Test** the production app at `https://car-services-azure.vercel.app`

The `credentials: "include"` will now work properly! 🎉
