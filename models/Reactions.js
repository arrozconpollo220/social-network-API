
const { Schema, Types } = require('mongoose');

const { format } = require('date-fns');


const formatDate = date = function(date) {
    return format(date, 'MM/dd/yyyy');
};

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            manxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;
