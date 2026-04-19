future scope after project
But there is one thing to improve

Your seeds use:

ON CONFLICT DO NOTHING;

But:

routes table has no UNIQUE constraint → duplicates possible
schedules also no unique constraint

👉 So if you run this multiple times:

You may insert duplicate routes/schedules

////////////////////////////////////////////
Best practice

You usually:

Run this file only once (initial setup)
Or use proper migration tools like:
knex
sequelize-cli
prisma migrate