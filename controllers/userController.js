const User = require('../models/Users');
const Thought = require('../models/Thoughts');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'Incorrect User ID or ID Does Not Exist' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving user', error: err });
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user); // Use 201 status for resource creation
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'Incorrect User ID or ID Does Not Exist' });
            }
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User deleted!' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user', error: err });
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Incorrect User ID or ID Does Not Exist' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error updating user', error: err });
        }
    },

    // Add a friend
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) {
                return res.status(404).json({ message: 'Incorrect Friend ID or ID Does Not Exist' });
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {C
                return res.status(404).json({ message: 'Incorrect Friend ID or ID Does Not Exist' });
            }

            res.json({ message: 'Friend added!' });
        } catch (err) {
            res.status(500).json({ message: 'Error adding friend', error: err });
        }
    },

    // Remove a friend
    async removeFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) {
                return res.status(404).json({ message: 'Incorrect Friend ID or ID Does Not Exist' });
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Incorrect Friend ID or ID Does Not Exist' });
            }

            res.json({ message: 'Friend removed!' });
        } catch (err) {
            res.status(500).json({ message: 'Error removing friend', error: err });
        }
    }
};
