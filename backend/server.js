const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

// set up express server
const app = express();

// to allow cors
app.use(cors());

// set json document size to be processed
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// set up mongoose
mongoose.connect(
    //connection string put here
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);

// set up routes
app.use('/api', require('./routes/todoitemRouter'));

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// what to add
// 1. prevent nosql injection
//    https://www.netsparker.com/blog/web-security/what-is-nosql-injection/
// 2. prevent mass assignment 
//    https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html
//    - Turn off mass assignment completely; in Mongoose this is accomplished by using strict mode.
//    - Whitelist the fields that are safe to be mass assigned, iterate over your body params, and only save the whitelisted fields.
//    - Blacklist the fields that are not safe to be mass assigned, iterate over your body params, and only save the fields that are not blacklisted.