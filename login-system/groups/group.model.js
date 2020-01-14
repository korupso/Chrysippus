const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the group object in the database.
 *
 * @property {*} name           This property holds the name of the group.
 * @property {*} owner          This property holds the owner of the group.
 * @property {*} createdDate    This property holds the creation date of the group.
 * @property {*} chat           This property holds the chat history of the group.
 * @property {*} members        This property holds the members of the group.
 * @property {*} favorite       This property holds an array of the users who have favorited the group.
 */
const schema = new Schema({
    name: { type: String, unique: true, required: true },
    owner: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    chat: { type: [{ username: String, message: String, date: Date }], required: true, default: [{ username: String, message: String, date: Date }] },
    members: { type: [{ id: String }], required: true },
    favorite: { type: [{ id: String }], required: true, default: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', schema);