# Development

Steps to run development environment:

1. Run database
```
docker compose up -d
```
2. Rename .env.template to .env
3. Replace environment variables in .env
4. Run SEED to [create local database](localhost:3000/api/seed)

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Production


# Stage
