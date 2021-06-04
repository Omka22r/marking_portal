const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.name = 'markPortal';
db.mongoose = mongoose;
db.url = process.env.DATA_ADD;
db.users = require("./users.model.js")(mongoose);
db.assignments = require("./assignments.model.js")(mongoose);


module.exports = db;