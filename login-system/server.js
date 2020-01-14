require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

/**
 * The following few lines contain all the paths and associated controllers used in the apps.
 */
app.use('/users', require('./users/users.controller'));
app.use('/groups', require('./groups/groups.controller'));
app.use('/chats', require('./chats/chats.controller'));

app.use(errorHandler);

const port = 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
