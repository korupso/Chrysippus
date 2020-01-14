const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the chat object in the database.
 * 
 * @property {*} members        This array holds the IDs of the chat's members.
 * @property {*} createdDate    This object holds the creation date of the chat.
 * @property {*} chat           This array holds the message history. A message contains the author's ID, the content of the message and the creation date.
 * @property {*} favorites      This array holds information on which user has favorited the chat.
 */
const schema = new Schema({
    members: { type: [{ id: String }], unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    chat: { type: [{ author: String, content: String, date: Date }], required: true },
    favorites: { type: [{ id: String }], required: true, default: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Chat', schema);