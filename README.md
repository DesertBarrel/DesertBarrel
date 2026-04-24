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

## Deploy (VPS + Docker)
On your VPS, install Docker + Docker Compose, then:

```bash
git clone <your-repo>
cd <your-repo>
```

Create a `.env` on the VPS (do not commit it):

```bash
ADMIN_CONTROL_SECRET=put_a_long_random_secret_here
ADMIN_CONTROL_PASSWORD=put_a_strong_password_here
```

Bring it up:

```bash
docker compose up -d --build
```

Your app will be on `http://<server-ip>:3000`.

### Domain + HTTPS
Put a reverse proxy in front (Caddy or Nginx) and forward `desertbarrel.com` to `http://127.0.0.1:3000`.

## Deploy DBRL token on Base (ERC-20)

This repo includes a simple fixed-supply ERC-20: `contracts/DesertBarrelToken.sol`.

1. Install deps:

```bash
npm install
```

2. Create `.env.deploy` from the example:

```bash
cp .env.deploy.example .env.deploy
```

Fill in:
- `PRIVATE_KEY` (deployer wallet funded with ETH on Base)
- `BASE_RPC_URL` (or `BASE_SEPOLIA_RPC_URL` for testnet)
- optional `BASESCAN_API_KEY` (for contract verification)

3. Compile + deploy:

```bash
npm run hh:compile
npm run token:deploy:base
```

After deployment, create liquidity on your chosen DEX (commonly Uniswap on Base). Nothing in this repo creates the pool automatically.
