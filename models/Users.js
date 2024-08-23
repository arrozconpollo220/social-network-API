// Initiate the user model
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                // adding the type to the ObjectId to link to the Thought model
                // this will return just the id of the thought and not the entire meta data
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                // adding the type to the ObjectId to link to the User model
                // this will return just the id of the user and not the entire meta data
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;