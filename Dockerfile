# ── Step 1: Choose a base image ──────────────────────────────────────────────
# We start from the official Node.js image (slim = smaller file size)
FROM node:20-slim

# ── Step 2: Set the working directory inside the container ───────────────────
# All following commands run from this folder
WORKDIR /app

# ── Step 3: Copy dependency files first (for better caching) ─────────────────
# Docker caches each layer — copying package files before source code means
# npm install only re-runs when dependencies change, not on every code change
COPY package*.json ./

# ── Step 4: Install dependencies ─────────────────────────────────────────────
RUN npm install --omit=dev

# ── Step 5: Copy the rest of your app's source code ──────────────────────────
COPY . .

# ── Step 6: Tell Docker which port the app listens on ────────────────────────
# This is documentation only — you still need -p when running
EXPOSE 3000

# ── Step 7: The command to start your app ────────────────────────────────────
CMD ["node", "app.js"]
