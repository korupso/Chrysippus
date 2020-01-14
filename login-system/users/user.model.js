const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the user object in the database.
 * 
 * @property {*} username       This property holds the username of the user.
 * @property {*} hash           This property holds the hash of the password of the user.
 * @property {*} createdDate    This property holds the creation date of the user.
 * @property {*} contacts       This property holds the user's contacts.
 */
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    contacts: { type: Array }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);