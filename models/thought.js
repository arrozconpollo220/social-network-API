// import the Schema constructor and model function from Mongoose
const { Schema, model } = require('mongoose');

// import reaction schema
const { schema: reactionSchema } = require('./reaction');

// import the dateformat library
const dateFormat = require('dateformat'); 

// create the Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp on query
        get: function(timestamp) {
            return dateFormat(timestamp, 'mm/dd/yyyy hh:mm:ss');
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            // use the reaction schema. This is not a model, but a subdocument schema.
            // will not just pass in the Reaction model, but the entire schema to use as the reaction field's data type. More efficient. 
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;