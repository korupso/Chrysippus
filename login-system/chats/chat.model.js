const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the chat object in the database.
 * 
 * @property {[{ id: String }]} members                                 This array holds the IDs of the chat's members.
 * @property { Date } createdDate                                       This object holds the creation date of the chat.
 * @property {[{ author: String, content: String, date: Date }]} chat   This array holds the message history. A message contains the author's ID, the content of the message and the creation date.
 * @property {[{ id: String }]} favorites                               This array holds information on which user has favorited the chat.
 */
const schema = new Schema({
    members: { type: [{ id: String }], unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    chat: { type: [{ author: String, content: String, date: Date }], default: [] },
    filter: { type: [{ id: String, favorite: Boolean, disabled: Boolean }], default: [] }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Chat', schema);