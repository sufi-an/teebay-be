
# Teebay Graphql API
    clone the repository
    
    cd tebay-be
    touch .env
    paste the following in your .env file
        DATABASE_URL="postgresql://postgres:teebay@localhost:35000/teebay?schema=public"
    
    PORT=5000

    run docker compose up -d --build to start postgresql database
    run npm install
    run npm run dev to start development server

    run npx prisma migrate dev --name your_migration_message



    
