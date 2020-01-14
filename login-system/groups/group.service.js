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
    remove,
    addUser,
    addMessage,
    removeUser,
    getById,
    getAll,
    getFavorites
};

/**
 * This method allows a user to create a new group.
 * 
 * @param {{ name: String, owner: String }} groupParam Must contain a body object with the group name, the owner's ID and the
 */
async function create(groupParam) {

    if (!groupParam.name || !groupParam.owner) throw 'Invalid arguements, can\'t create group';

    if (await Group.findOne({ name: groupParam.name })) throw 'Groupname "' + groupParam.name + '" is already taken';

    const group = new Group(groupParam);

    await group.save();
}

/**
 * This method is used to get information about a specific group.
 *
 * @param { String } id Must contain a params object with the ID of the group to be returned.
 * 
 * @returns The group object found with the ID given.
 */
async function getById(id) {
    return await Group.findById(id);
}

/**
 * This method fetches all group objects from the database.
 * 
 * @returns An array containing all group objects.
 */
async function getAll() {
    await Group.find((err, groups) => {
        return groups;
    });
}

/**
 * This method fetches all group objects from the database, which are favorited by the given user.
 * 
 * @param { String } id The ID of the given user.
 * 
 * @returns An array containing all group objects, which are favorited by the user given.
 */
async function getFavorites(id) {
    await Group.find((err, groups) => {
        return groups;
    });
}

/**
 * This method adds a given user to a given group.
 * 
 * @param { String } id       The ID of the group, where the user has to be added.
 * @param { String } userID   The ID of the user to be added.
 */
async function addUser(id, userID) {
    const group = await Group.findById(id);
    const user = await User.findById(userID);

    if (!group) throw "Group not found";
    if (!user) throw "User not found";

    group.members.push(user);

    await group.save();
}

/**
 * This method removes a given user from a given group.
 * 
 * @param { String } id       The ID of the group, where the user has to be removed.
 * @param { String } userID   The ID of the user, who has to be removed from the given group.
 */
async function removeUser(id, userID) {
    const group = await Group.findById(id);

    if (!group) throw "Group not found";
    if (!group.members.includes(userID)) throw "The specified user is not in the group";

    for (var i = 0; i < group.members.length; i++) if (group.members[i] === userID) arr.splice(i, 1);

    await group.save();
}

/**
 * This method adds a message to the chat history of a given group.
 * 
 * @param { String } id                                   The ID of the group, where the message has to be added.
 * @param {{ author: String, content: String }} message   The message object containing the content and the author of the message.
 */
async function addMessage(id, message) {
    var group = await Group.findById(id);

    group.chat.push({ username: message.author, message: message.content, date: Date.now() });

    await group.save();
}

/**
 * This method allows the owner of the group to delete it.
 * 
 * @param { String } id     The ID of the group to be deleted.
 * @param { String } owner  The ID of the owner of the group.
 */
async function remove(id, owner) {
    const group = await Group.findById(id);

    if (group.owner !== owner) throw "You do not have permission to delete the given group";

    Group.findByIdAndRemove(id, (err, group) => {
        if (err) throw "Something didn't quite work";
    });
}