module.exports = mongoose => {
    const Assignments = mongoose.model(
        "Assignment",
        mongoose.Schema(
            {
                user_id: String,
                title: { type: String, default: 'On Board Assignment' }
                
            },
            { timestamps: true }
        )
    );

    return Assignments;
};