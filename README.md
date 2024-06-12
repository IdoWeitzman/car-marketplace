# How to run?
## Prerequisites: 
#### Postgres:
1. You need to have postgres installed. follow [this guide](https://www.postgresql.org/docs/current/installation.html) and than follow guides [1.3, 1.4](https://www.postgresql.org/docs/current/tutorial-start.html) to create and access your database.
2. create the tables from this [file](https://github.com/IdoWeitzman/car-marketplace/blob/main/db-creation.sql) (copy-paste the sql to your cmd that is connected to postgres)

### Running the project
1. Clone this repo to your local machine
2. Create .env file (for postgres config) in the root of the project. Add this content to the file:
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://<your_pc_user>:<your_pc_password>W@localhost:5432/car-marketplace?schema=public"
```

Change the pc_user and pc_password to match your machine creds. </br>
3. Run npm install  </br>
4. Run npm run dev  </br>
5. navigate to http://localhost:3000 and you are good to go :)   </br>

## My Approach 
I tried to create a project that is easy to maintain/refactor and add tests to. </br>
I used relational db since the data is structured. </br>
The db has 3 tables: 
1. CarModels - holds data about raw car models (for example, Tesla model 3, 2019)
2. Cars - holds data about specific Cars. has foreign key for CarModels and holds more data such as: `is_available` and `picture_urls`.
3. Bids - holds data about bids for a car. has foreign key for Cars.
Splitting to three tables makes it easier to extend the entities in the future.
Also there are 3 indexes: for Cars(user_id), Bids(car_id), Bids(user_id) for more optimized reads.

In the ui side I tried to make the components as modular as possible.

## Challenges
I had to learn some new stuff- Prisma and react-hook-form. Prisma is awesome. However, it took me about 20 minutes to understand how to use it properly with typescript.
It's also the first time i'm developing real app with React Server Components, so it slowed me down at first. To overcome both challenges, i took a short pause and read about the stuff that I don't understand.

## Trade offs
I didn't write any tests because of time constraints, but the code is defenitely testable.

## Left out
