const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Chat = db.Chat;

module.exports = {
    addMessage,
    getById,
    getAll
};

async function addMessage(id, chatParam) {
    var chat = await Chat.findById(id);

    chat.chat.push({ username: chatParam.username, message: chatParam.message, date: Date.now() });

    await chat.save();
}

async function getById(id) {
    return await Chat.findById(id);
}

async function getAll() {
    await Chat.find((err, chats) => {
        return chats;
    });
}