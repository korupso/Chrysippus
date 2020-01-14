const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the user object in the database.
 * 
 * @property { String } username            This property holds the username of the user.
 * @property { String } hash                This property holds the hash of the password of the user.
 * @property { Date } createdDate           This property holds the creation date of the user.
 * @property {[{ id: String }]} contacts    This property holds the user's contacts.
 */
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    contacts: { type: [{ id: String }] }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);