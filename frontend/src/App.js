import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContactsTable from './ContactsTable';
import ContactForm from './ContactForm';

const api = axios.create({ baseURL: 'http://localhost:5001/api/contacts' });

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchContacts = async () => {
    try {
      const res = await api.get('/');
      setContacts(res.data);
    } catch {
      setNotification({ open: true, message: 'Failed to fetch contacts', severity: 'error' });
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleCreate = async (data) => {
    try {
      const res = await api.post('/', data);
      setContacts([...contacts, res.data]);
      setNotification({ open: true, message: 'Contact added!', severity: 'success' });
    } catch (err) {
      setNotification({ open: true, message: err.response?.data?.errors?.[0]?.msg || 'Error', severity: 'error' });
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/${id}`, data);
      setContacts(contacts.map(c => c.id === id ? res.data : c));
      setEditing(null);
      setNotification({ open: true, message: 'Contact updated!', severity: 'success' });
    } catch (err) {
      setNotification({ open: true, message: err.response?.data?.errors?.[0]?.msg || 'Error', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await api.delete(`/${id}`);
      setContacts(contacts.filter(c => c.id !== id));
      setNotification({ open: true, message: 'Contact deleted!', severity: 'success' });
    } catch {
      setNotification({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Contacts Manager</Typography>
      <ContactForm
        onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleCreate}
        editing={editing}
        onCancel={() => setEditing(null)}
      />
      <ContactsTable
        contacts={contacts}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <MuiAlert elevation={6} variant="filled" severity={notification.severity}>
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default App;
