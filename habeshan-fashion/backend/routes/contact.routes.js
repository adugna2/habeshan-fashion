import express from 'express';
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} from '../controllers/contact.controllers.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createContact);           // Public: anyone can send a contact message
router.get('/', verifyAdmin, getContacts); // Admin only: list messages
router.put('/:id', verifyAdmin, updateContact);  // Admin only: update message
router.delete('/:id', verifyAdmin, deleteContact); // Admin only: delete message

export default router;
