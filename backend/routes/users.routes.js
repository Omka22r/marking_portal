module.exports = app => {

    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Users
    router.post("/users/signup", users.signUp);

    // Retrieve all users
    router.get("/users", users.userList);

    // Delete all users
    router.delete("/users", users.clearUsers);

    // Authenticate Users
    router.get("/users/auth", users.authenticate);

    // Email Students
    router.get("/users/email", users.sendEmail);

    app.use('/api', router);
};