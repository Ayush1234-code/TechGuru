# Tech Guru

Tech Guru is a MERN interview preparation platform inspired by Pramp, LeetCode, and Interviewing.io. It includes JWT auth, resume analysis, category practice, timed mock tests, full-screen assessment mode, coding practice, feedback reports, history, and profile analytics.

## Stack

- Frontend: React, Vite, Tailwind CSS, lucide-react
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT, bcrypt
- AI: OpenAI ChatGPT API from the backend only

## Folder Structure

```text
backend/
  src/config       MongoDB connection
  src/controllers  Route handlers
  src/middleware   JWT protection
  src/models       Mongoose schemas
  src/routes       Express routers
  src/utils        AI helper and sample data
frontend/
  src/components   Reusable UI and app shell
  src/context      Auth context
  src/data         Local fallback question/problem bank
  src/pages        Product pages
  src/services     API client
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Set `OPENAI_API_KEY` in `backend/.env` to enable real AI resume/question/feedback generation. Without the key, the backend returns structured fallback JSON so the app remains demo-ready.

To enable password reset emails, also set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, and `FRONTEND_URL` in `backend/.env`. `FRONTEND_URL` must point to the public frontend origin so reset links open the correct app.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5000/api`. To change it, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Flow

1. Open the landing page and create an account.
2. Use the dashboard quick cards to upload a resume, practice questions, start a mock test, enter assessment mode, or solve coding problems.
3. Login/signup gracefully falls back to a local demo user if the backend or MongoDB is not running.
4. Mock tests auto-submit when the timer ends and keep Previous/Next controls visible.
5. Coding practice uses a mock runner unless you connect a compiler service later.

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`
- `POST /api/resume/upload`
- `GET /api/resume/me`
- `POST /api/resume/analyze-ai`
- `GET /api/questions`
- `GET /api/questions/category/:category`
- `POST /api/questions/generate-ai`
- `POST /api/tests/start`
- `POST /api/tests/submit`
- `GET /api/tests/history`
- `GET /api/coding/problems`
- `GET /api/coding/problems/:id`
- `POST /api/coding/run`
- `POST /api/coding/submit`
- `GET /api/analytics/dashboard`
- `GET /api/analytics/performance`

## Production Notes

- Replace the mock code runner with a sandboxed compiler API such as Judge0 for real execution.
- Store uploaded resumes in S3/Cloudinary instead of local disk for production.
- Review rate limiting thresholds and add refresh-token rotation before public launch.
- Configure a production SMTP provider and set `FRONTEND_URL` to the deployed frontend HTTPS origin for password reset emails.
- Keep `OPENAI_API_KEY` and SMTP credentials only in `backend/.env`.
