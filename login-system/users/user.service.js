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
    update
};

/**
 * This method adds a new user to the database.
 * 
 * @param {*} userParam A simplified user object. Must contain a username and a password.
 */
async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) throw 'Username "' + userParam.username + '" is already taken';

    const user = new User(userParam);

    if (userParam.password) user.hash = bcrypt.hashSync(userParam.password, 10);

    await user.save();
}

/**
 * This method checks whether a user exists with the given username and password and returns a JWT if the check completes successfully.
 * 
 * @param {} userParam A simplified user object. Must contain a username and a password.
 */
async function authenticate(userParam) {
    const user = await User.findOne(userParam.username);
    if (user && bcrypt.compareSync(password, user.hash)) {
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
 * @param {*} id The ID of a user object.
 */
async function getById(id) {
    return await User.findById(id).select('-hash');
}

/**
 * This method checks whether only the password of the given simplified user object and the simplified user object of the database is different and updates it to a new value.
 * 
 * @param {*} id The id of a user in the database. The one who may be updated with this method.
 * @param {*} userParam The new simplified user object, containing the new password.
 */
async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) throw 'Username "' + userParam.username + '" is already taken';

    if (userParam.password) userParam.hash = bcrypt.hashSync(userParam.password, 10);

    Object.assign(user, userParam);

    await user.save();
}