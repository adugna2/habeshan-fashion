import db from '../db.config.js';

export const addContactService = (data, callback) => {
  const { service_type, message, contact_method } = data;
  const query = `
    INSERT INTO contacts (service_type, message, contact_method)
    VALUES (?, ?, ?)
  `;
  db.query(query, [service_type, message, contact_method], callback);
};

export const getAllContacts = (callback) => {
  db.query('SELECT * FROM contacts ORDER BY created_at DESC', callback);
};

export const updateContactById = (id, data, callback) => {
  const { service_type, message, contact_method } = data;
  const query = `
    UPDATE contacts SET service_type = ?, message = ?, contact_method = ?
    WHERE id = ?
  `;
  db.query(query, [service_type, message, contact_method, id], callback);
};

export const deleteContactById = (id, callback) => {
  db.query('DELETE FROM contacts WHERE id = ?', [id], callback);
};
