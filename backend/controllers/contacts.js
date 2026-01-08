import db from '../db.js';
import { validationResult } from 'express-validator';

export const isEmailUnique = async (email, { req }) => {
  const id = req.params.id || null;
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id FROM contacts WHERE email = ? AND (id != ? OR ? IS NULL)',
      [email, id, id],
      (err, row) => {
        if (err) reject(new Error('Database error'));
        if (row) reject(new Error('Email already exists'));
        resolve(true);
      }
    );
  });
};

export const getAllContacts = (req, res, next) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

export const getContactById = (req, res, next) => {
  db.get('SELECT * FROM contacts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: 'Contact not found' });
    res.json(row);
  });
};

export const createContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, phone } = req.body;
  db.run(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    function (err) {
      if (err) return next(err);
      db.get('SELECT * FROM contacts WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return next(err);
        res.status(201).json(row);
      });
    }
  );
};

export const updateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, phone } = req.body;
  db.run(
    'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, req.params.id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) return res.status(404).json({ error: 'Contact not found' });
      db.get('SELECT * FROM contacts WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return next(err);
        res.json(row);
      });
    }
  );
};

export const deleteContact = (req, res, next) => {
  db.run('DELETE FROM contacts WHERE id = ?', [req.params.id], function (err) {
    if (err) return next(err);
    if (this.changes === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).end();
  });
};
