const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    members: { type: Array, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    chat: { type: [{ username: String, message: String, date: Date }], required: true },
    favorite: { type: Boolean, required: true, default: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Chat', schema);