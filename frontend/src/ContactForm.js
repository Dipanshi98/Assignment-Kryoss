import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function ContactForm({ onSubmit, editing, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (editing) {
      reset(editing);
    } else {
      reset({ name: '', email: '', phone: '' });
    }
  }, [editing, reset]);

  return (
    <Paper className="glass" sx={{ p: 3, mb: 4, mt: 2 }} elevation={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <TextField
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: 'Invalid email format'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Phone"
            {...register('phone', {
              required: 'Phone is required',
              minLength: { value: 10, message: 'Min 10 digits' },
              maxLength: { value: 15, message: 'Max 15 digits' },
              pattern: {
                value: /^\d+$/,
                message: 'Digits only'
              }
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {editing ? 'Update' : 'Add'}
          </Button>
          {editing && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </form>
    </Paper>
  );
}

export default ContactForm;
