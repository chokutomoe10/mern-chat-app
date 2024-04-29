const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    const { username, password, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ username, password: hashedPassword, firstname, lastname });

    try {
        const oldUser = await UserModel.findOne({username});

        if (oldUser) {
            return res.status(400).json("username is already registered!");
        }

        const user = await newUser.save();

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const loginUser = async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({username: username});

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("invalid email or password")
            } else {
                const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("User does not exists");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { registerUser, loginUser };