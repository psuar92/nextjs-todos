# Welcome!

This is a project to test and practice Next.js 14 features for learning purposes. 

Technologies used:

- Next.js 14
- Typescript
- Prisma
- TailwindCSS
- PostgreSQL
- Docker

# Development

Steps to run development environment:

1. Run database
```
docker compose up -d
```
2. Rename .env.template to .env
3. Replace environment variables in .env
4. Run command ```npm install```
5. Run command ```npm run dev```
4. Run SEED to [create local database](localhost:3000/api/seed)
6. Run command ```npx auth secret``` to generate a random token for NextAuth in the .env.local file, paste it to the .env file

## Note:

Default user for login


__email:__ test1@mail.com

__password:__ 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```