import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
