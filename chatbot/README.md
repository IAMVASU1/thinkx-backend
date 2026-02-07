# Alumni Association Chatbot Service

## Overview
This is a dedicated chat service (not the main backend). It connects to the same MongoDB Atlas database and reads the primary app schemas to generate intelligent responses.

## Tech Stack
- Node.js, Express.js
- MongoDB Atlas (Mongoose)
- OpenAI API

## Folder Structure
```
chatbot
  src
    config
    models
    controllers
    routes
    middleware
    utils
    server.js
    app.js
  scripts
    seed.js
  .env.example
  package.json
```

## Setup
1. Install dependencies
```
npm install
```
2. Create `.env`
Copy `.env.example` to `.env` and fill in values.

3. Seed demo data (optional)
```
npm run seed
```

4. Start server
```
npm run dev
```

## API Endpoints
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

- `GET /api/alumni-profiles`
- `POST /api/alumni-profiles`
- `GET /api/alumni-profiles/:id`
- `PUT /api/alumni-profiles/:id`
- `DELETE /api/alumni-profiles/:id`

- `GET /api/jobs`
- `POST /api/jobs`
- `GET /api/jobs/:id`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`

- `GET /api/job-applications`
- `POST /api/job-applications`
- `GET /api/job-applications/:id`
- `PUT /api/job-applications/:id`
- `DELETE /api/job-applications/:id`

- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

- `GET /api/donations`
- `POST /api/donations`
- `GET /api/donations/:id`
- `PUT /api/donations/:id`
- `DELETE /api/donations/:id`

- `GET /api/feedback`
- `POST /api/feedback`
- `GET /api/feedback/:id`
- `PUT /api/feedback/:id`
- `DELETE /api/feedback/:id`

- `GET /api/success-stories`
- `POST /api/success-stories`
- `GET /api/success-stories/:id`
- `PUT /api/success-stories/:id`
- `DELETE /api/success-stories/:id`

- `GET /api/surveys`
- `POST /api/surveys`
- `GET /api/surveys/:id`
- `PUT /api/surveys/:id`
- `DELETE /api/surveys/:id`

- `POST /api/chat`

## Sample Requests
### Create User
```
POST /api/users
{
  "name": "Ava Miller",
  "email": "ava@example.com",
  "password": "secret123",
  "role": "ALUMNI"
}
```

### Chat
```
POST /api/chat
{
  "message": "Suggest alumni connections and relevant jobs",
  "userId": "<userId>"
}
```

## Frontend Integration Examples
### Next.js
```js
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, userId })
});
const data = await res.json();
```

### React Native
```js
const response = await fetch(`${API_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, userId })
});
const data = await response.json();
```

## Deployment
1. Set environment variables in your hosting platform.
2. Ensure `npm install` runs.
3. Start with `npm start`.
4. Use a managed MongoDB Atlas cluster.

