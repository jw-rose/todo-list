import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { chores } from './schema'

const db = drizzle(process.env.DATABASE_URL!);

const seedChores = [
  { title: "Do the dishes",         done: false },
  { title: "Vacuum the living room", done: false },
  { title: "Take out the trash",    done: true  },
  { title: "Do the laundry",        done: false },
  { title: "Clean the bathroom",    done: false },

]

async function seed () {
    console.log("seeding the database");

    await db.delete(chores);

    await db.insert(chores).values(seedChores);

    console.log(`Inserted ${seedChores.length} chores`);
    process.exit(0)
}

seed().catch((err) => {
    console.error("seed failed", err);
    process.exit(1)
});
