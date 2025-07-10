import {
  addContactService,
  getAllContacts,
  updateContactById,
  deleteContactById
} from '../services/contactservices.js';

export const createContact = (req, res) => {
  addContactService(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create contact' });
    res.status(201).json({ message: 'Contact message sent' });
  });
};

export const getContacts = (req, res) => {
  getAllContacts((err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch contacts' });
    res.json(data);
  });
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  updateContactById(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Contact updated' });
  });
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  deleteContactById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Contact deleted' });
  });
};
