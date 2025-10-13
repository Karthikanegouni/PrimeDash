const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')

// Ensure the database folder exists
const databaseDir = path.resolve(__dirname, '../database')
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true })
}

const dbPath = path.join(databaseDir, 'database.sqlite')

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message)
  } else {
    console.log('Connected to SQLite database at', dbPath)
  }
})

// Create tables if they don't exist
db.serialize(() => {
  // Users table
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );`,
    (err) => {
      if (err) console.error('Error creating users table:', err.message)
      else console.log('Users table ready')
    }
  )

  // Tasks table
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        );`,
    (err) => {
      if (err) console.error('Error creating tasks table:', err.message)
      else console.log('Tasks table ready')
    }
  )
})

module.exports = db
