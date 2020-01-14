const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Chat = db.Chat;
const User = db.User;

/**
 * This object lists all methods to be exported from this file.
 */
module.exports = {
    getById,
    getAll,
    toggleFavorite,
    addMessage
};

/**
 * This method fetches a chat object associated with the ID given.
 * 
 * @param { String } id The ID of the chat to be fetched.
 * @returns The chat associated with the ID given.
 *
 * @author Joel Meccariello
 */
async function getById(id) {
    return await Chat.findById(id);
}

/**
 * This method fetches all chat objects associated with the given ID.
 * 
 * @param {{ String }} id The ID of the user, who wants an array of his chats.
 *
 * @author Joel Meccariello
 */
async function getAll(id) {
    await Chat.find((err, chats) => {
        var resChats = [];

        for (var i = 0; i < chats.length; i++) if (chats[i].members.includes()) resChats.push(chats[i]);

        return resChats;
    });
}

/**
 * This method adds or removes a user's ID to or from the favorites array, depending on if the ID is already present or not.
 * 
 * @param { String } id     The ID of the chat, where the user wants to add or remove it from it's favorites.
 * @param { String } userID The ID of the user, who wants to add or remove the chat to or from it's favorites.
 *
 * @author Joel Meccariello
 */
async function toggleFavorite(id, userID) {
    const chat = await Chat.findById(id);
    const user = await User.findById(userID);

    if (!chat) throw "Chat not found";
    if (!user) throw "User not found";
    if (!chat.members.includes(userID)) throw "User is not in the chat";

    if (chat.favorites.includes(userID)) {
        for (var i = 0; i < chat.favorites.length; i++) if (chat.favorites[i] === userID) arr.splice(i, 1);
    }
    else chat.favorites.push(userID);

    await chat.save();
}

/**
 * A user can add a message object to the chat history of the chat.
 * 
 * @param { String } id                                 The ID of the chat, where a message has to be added.
 * @param {{ author: String, content: String }} message The message object containing the author and the content of the message.
 *
 * @author Joel Meccariello
 */
async function addMessage(id, message) {
    var chat = await Chat.findById(id);

    chat.chat.push({ author: message.author, content: message.content, date: Date.now() });

    await chat.save();
}