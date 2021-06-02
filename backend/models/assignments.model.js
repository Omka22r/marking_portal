module.exports = mongoose => {
    
// Multiple Choice Question to select one option for answwer
    let question_mc = {
        title: "When Was BCIT's 50th-annniversary celebration ?",
        options: ["2016", "1976", "2002", "1999"]
    };

// Multiple Choice Question to select more then one options for answer
    let question_mcs = {
        title: "Which of the following services does the LTC provide ? Select all that apply.",
        type: 'mcs',
        options: ['Technicall Illustration', 'Instructional Design', 'Financial Advice', 'Admission and Registration', 'Audio-visual Loans']
    };

// Fill in the blank Question
    let question_fb = {
        title: "The current Prime Minister in Canada is (include the starting year for the PM).",
        type: 'fb',

    };
    
    
// Questions Schema   
    let questions = mongoose.Schema(
        {
            title: { type: String, default: "When Was BCIT's 50th-annniversary celebration ?" },
            type: { type: String, default: 'mc' },
            options: { type: Array, default: [] },
            answer: { type: Array, default: [] }
        });

    
// Assignment Collection Schema    
    const Assignments = mongoose.model(
        "Assignment",
        mongoose.Schema(
            {
                user_id: String,
                title: { type: String, default: 'On Board Assignment' },
                description: { type: String, default: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
                submitted: { type: Boolean, default: false },
                status: { type: String, default: 'Not Started' },
                score: { type: Number, default: 0 },
                questions: { type: [questions], default: [question_mc, question_mcs, question_fb] }
                
            },
            { timestamps: true }
        )
    );

    return Assignments;
};