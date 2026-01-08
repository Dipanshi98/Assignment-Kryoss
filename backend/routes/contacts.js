import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  isEmailUnique
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').custom(isEmailUnique),
    body('phone').isLength({ min: 10, max: 15 }).withMessage('Phone must be 10-15 digits')
  ],
  createContact
);
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').custom(isEmailUnique),
    body('phone').isLength({ min: 10, max: 15 }).withMessage('Phone must be 10-15 digits')
  ],
  updateContact
);
router.delete('/:id', deleteContact);

export default router;
