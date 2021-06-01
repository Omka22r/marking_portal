module.exports = mongoose => {
    const Users = mongoose.model(
        "User",
        mongoose.Schema(
            {
                name: String,
                username: String,
                usertype: { type: String, default: 'Instructor' },
                password:{type: String, default:'123Test'},
                email:String
                
            },
            { timestamps: true }
        )
    );

    return Users;
};