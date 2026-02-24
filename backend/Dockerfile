FROM node:20-alpine

WORKDIR /app

# 1. Copy dependency files (keeps your "better caching" logic)
COPY package.json package-lock.json* ./

# 2. Install production dependencies
RUN npm install --omit=dev

# 3. Copy application code
COPY . .

# 4. CRITICAL: Must be 8080 to match Phase 3 and Ingress requirements
EXPOSE 800

CMD ["npm", "start"]
