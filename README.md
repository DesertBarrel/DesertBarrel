# Desert Barrel V11009

This is a downloadable Next.js launch/admin pack for DBRL.

## Before running
1. Copy `.env.local.example` to `.env.local`
2. Fill in strong values for:
   - `ADMIN_CONTROL_SECRET`
   - `ADMIN_CONTROL_PASSWORD`

## Update live values
Edit `lib/live-values.ts` and replace:
- X URL
- Telegram URL
- contract / explorer URL

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm start
```

## Deploy (Vercel)
1. Push this project to GitHub/GitLab/Bitbucket.
2. In Vercel, import the repo as a new Project.
3. In **Project Settings → Environment Variables**, add (Production + Preview):
   - `ADMIN_CONTROL_SECRET` (long random string)
   - `ADMIN_CONTROL_PASSWORD` (strong password)
4. Deploy.

After deploy, verify:
- `/` loads
- `/api/status` returns `200`
