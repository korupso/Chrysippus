const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Group = db.Group;
const User = db.User;

/**
 * This object lists all methods to be exported from this file.
 */
module.exports = {
    create,
    getById,
    getAll,
    getMessages,
    addUser,
    addMessage,
    toggleFavorite,
    removeUser,
    remove,
    getAllGroups
};

async function getAllGroups() {
    return await Group.find({});
}

/**
 * This method allows a user to create a new group.
 * 
 * @param {{ name: String, owner: String }} groupParam Must contain the new group's name and the owner's ID.
 *
 * @author Joel Meccariello
 */
async function create(groupParam) {
    if (!groupParam.name || !groupParam.owner) throw 'Invalid arguments, can\'t create group';

    var group = new Group(groupParam);

    return await group.save();
}

/**
 * This method is used to get information about a specific group.
 *
 * @param { String } id Must contain a params object with the ID of the group to be returned.
 * 
 * @returns The group object found with the ID given.
 *
 * @author Joel Meccariello
 */
async function getById(id) {
    var chat = await Group.findById(id);
    var owner = await User.findById(chat.owner);

    chat.owner = owner.username;

    var members = [];
    for (var i = 0; i < chat.members.length; i++) {
        var member = await User.findById(chat.members[i]._id);
        members.push({ id: chat.members[i]._id, username: member.username });
    }

    console.log(chat);
    return { id: chat.id, name: chat.name, owner: chat.owner, createdDate: chat.createdDate, members: members };
}

/**
 * This method fetches all group objects from the database.
 * 
 * @param { String } id The ID of the user fetching the group.
 * 
 * @returns An array containing all group objects.
 *
 * @author Joel Meccariello
 */
async function getAll(id) {
    var myGroups = [];
    var favGroups = [];
    var groupsImIn = [];
    var allGroups = await Group.find({});
    var user = await User.findById(id);

    if (!user) throw "User does not exist";

    for (var group of allGroups) if (group.owner === id) myGroups.push(group);
    for (var group of allGroups) if (!myGroups.includes(group)) for (var favorite of group.favorite) if (favorite._id == id) favGroups.push(group);
    for (var group of allGroups) if (!myGroups.includes(group) && !favGroups.includes(group)) for (var member of group.members) if (member._id == id) groupsImIn.push(group);

    return {
        myGroups: myGroups,
        favGroups: favGroups,
        groupsImIn: groupsImIn
    };
}

async function getMessages(id) {
    const chat = await Group.findById(id);
    var userMap = [];
    var chatHistory = [];

    if (!chat) throw "Group not found";

    for (var message of chat.chat) {
        var foundUser = false;
        for (var user of userMap) {
            if (message.author === user.id) {
                foundUser = true;
                chatHistory.push({ author: user.username, message: message.message, date: message.date });
            }
        }
        if (!foundUser) {
            var user = (await User.findById(message.author));
            userMap.push({ username: user.username, id: user.id });
            chatHistory.push({ author: user.username, message: message.message, date: message.date });
        }
    }

    console.log(chatHistory);

    return chatHistory;
}

/**
 * This method adds a given user to a given group.
 * 
 * @param { String } id       The ID of the group, where the user has to be added.
 * @param { String } username   The ID of the user to be added.
 *
 * @author Joel Meccariello
 */
async function addUser(id, username) {
    const group = await Group.findById(id);
    const user = await User.find({ username: username });

    console.log("test: " + user);

    if (!group) throw "Group not found";
    if (!user) throw "User not found";
    if (group.owner === user.id) throw "You are already the owner of the group";
    if (group.members.includes(user.id)) throw "User is already in group";

    group.members.push(user.id);

    await group.save();
}

/**
 * This method adds a message to the chat history of a given group.
 * 
 * @param { String } id                                   The ID of the group, where the message has to be added.
 * @param {{ author: String, content: String }} message   The message object containing the content and the author of the message.
 *
 * @author Joel Meccariello
 */
async function addMessage(id, message) {
    var group = await Group.findById(id);

    console.log(message);

    group.chat.push({ author: message.author, message: message.content, date: Date.now() });

    await group.save();
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
    const chat = await Group.findById(id);
    const user = await User.findById(userID);

    if (!chat) throw "Chat not found";
    if (!user) throw "User not found";
    for (var member of chat.members) if (member._id != userID) throw "User is not in the chat";

    var isInFavorites = false;
    for (var i = 0; i < chat.favorite.length; i++) if (favorite._id == userID) {
        isInFavorites = true;
        chat.favorite.splice(i, 1);
    }
    if (!isInFavorites) chat.favorite.push(userID);

    await chat.save();
}

/**
 * This method removes a given user from a given group.
 * 
 * @param { String } id       The ID of the group, where the user has to be removed.
 * @param { String } userID   The ID of the user, who has to be removed from the given group.
 *
 * @author Joel Meccariello
 */
async function removeUser(id, userID) {
    const group = await Group.findById(id);

    if (!group) throw "Group not found";
    if (group.owner === userID) throw "The owner can't be removed from their group";
    if (!group.members.includes(userID)) throw "The specified user is not in the group";

    for (var i = 0; i < group.members.length; i++) if (group.members[i] === userID) group.members = group.members.splice(i, 1);

    await group.save();
}

/**
 * This method allows the owner of the group to delete it.
 * 
 * @param { String } id     The ID of the group to be deleted.
 * @param { String } owner  The ID of the owner of the group.
 *
 * @author Joel Meccariello
 */
async function remove(id, owner) {
    const group = await Group.findById(id);

    if (group.owner !== owner) throw "You do not have permission to delete the given group";

    Group.findByIdAndRemove(id, (err, group) => {
        if (err) throw "Something didn't quite work";
    });
}