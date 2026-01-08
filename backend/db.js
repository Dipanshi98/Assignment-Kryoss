import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) throw err;
});
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL)'
  );
});
export default db;
