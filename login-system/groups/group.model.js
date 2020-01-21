const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This object holds the schema of the group object in the database.
 *
 * @property { String } name                                            This property holds the name of the group.
 * @property { String } owner                                           This property holds the owner of the group.
 * @property { Date } createdDate                                       This property holds the creation date of the group.
 * @property {[{ author: String, message: String, date: Date }]} chat This property holds the chat history of the group.
 * @property {[{ id: String }]} members                                 This property holds the members of the group.
 * @property {[{ id: String }]} favorite                                This property holds an array of the users who have favorited the group.
 */
const schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    chat: { type: [{ author: String, message: String, date: Date }], default: [] },
    members: { type: [{ id: String }], default: [] },
    favorite: { type: [{ id: String }], default: [] }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', schema);