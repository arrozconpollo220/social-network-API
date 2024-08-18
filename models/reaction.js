// Initialize Mongoose
const { Schema, model } = require('mongoose');

// import the dateformat library
const dateFormat = require('dateformat');

// create the Reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp, 'mm/dd/yyyy hh:mm:ss')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// export the Reaction model
module.exports = reactionSchema;

