## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/ScopE19/FitnessClub
   ```
2. Install dependencies:
   ```bash
   cd FitnessClub
   npm install
   ```
3. Create your own .env file in root directory
4. Migrate the database:
   ```bash
   npx prisma migrate deploy
   ```
5. You can also copy all values of my mock database:
   ```bash
   In pgAdmin (or whatever you are using) > create database > Restore > Chooose backup_db folder
   ```
6. Run the dev server:
   ```bash
   npm run dev
   ```
