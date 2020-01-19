const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

/**
 * This object lists all methods to be exported from this file.
 */
module.exports = {
    create,
    authenticate,
    getById,
    update,
    addContact,
    removeContact
};

/**
 * This method adds a new user to the database.
 * 
 * @param {{ username: String, password: String }} userParam A simplified user object. Must contain a username and a password.
 *
 * @author Joel Meccariello
 */
async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) throw 'Username "' + userParam.username + '" is already taken';

    const user = new User(userParam);

    if (userParam.password) user.hash = bcrypt.hashSync(userParam.password, 10);

    await user.save();

    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
        ...userWithoutHash,
        token
    };
}

/**
 * This method checks whether a user exists with the given username and password and returns a JWT if the check completes successfully.
 * 
 * @param {{ username: String, password: String }} userParam A simplified user object. Must contain a username and a password.
 *
 * @author Joel Meccariello
 */
async function authenticate(userParam) {
    const user = await User.findOne({ username: userParam.username });
    if (user && bcrypt.compareSync(userParam.password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

/**
 * This method returns the user object bound to the given ID.
 * 
 * @param { String } id The ID of a user object.
 *
 * @author Joel Meccariello
 */
async function getById(id) {
    return await User.findById(id).select('-hash');
}

/**
 * This method checks whether only the password of the given simplified user object and the simplified user object of the database is different and updates it to a new value.
 * 
 * @param { String } id The id of a user in the database. The one who may be updated with this method.
 * @param { String } password The new password.
 *
 * @author Joel Meccariello
 */
async function update(id, password) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (!password) throw "No new password was given";

    user.hash = bcrypt.hashSync(password, 10);

    await user.save();
}

/**
 * This method allows the user to add another user to his contacts.
 * 
 * @param { String } id         The ID of the current user, adding the contact to his contact list.
 * @param { String } contactId  The ID of the user to be added to the current user's contacts.
 * 
 * @author Joel Meccariello
 */
async function addContact(id, contactId) {
    const user = await User.findById(id);
    const contact = await User.findById(contactId);

    if (!user) throw "Something went wrong";
    if (!contact) throw "This user doesn't exist";
    for (var i = 0; i < user.contacts.length; i++) if (contactId === user.contacts[i]) throw "User is already in your contact list";

    user.contacts.push(contactId);

    await user.save();
}

async function removeContact(id, contactId) {
    const user = await User.findById(id);
    const contact = await User.findById(contactId);

    if (!user) throw "Something is wrong";
    if (!contact) throw "This user doesn't exist";

    var isInContacts = false;
    for (var i = 0; i < user.contacts.length; i++) if (user.contacts[i]._id == contactId) isInContacts = true;
    if (!isInContacts) throw "This user is not in your contact list";

    user.contacts.forEach((contact, index) => {
        if (contact._id == contactId) user.contacts.splice(index, 1);
    });

    await user.save();
}