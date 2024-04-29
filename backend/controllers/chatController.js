const chatModel = require('../models/ChatModel');

const createChat = async(req, res) => {
    const {senderId, receiverId} = req.body;
    const newChat = new chatModel({
        members: [senderId, receiverId]
    });

    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const userChats = async(req, res) => {
    try {
        const chats = await chatModel.find({
            members: {$in: [req.params.userId]}
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const findChat = async(req, res) => {
    try {
        const chat = await chatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { createChat, userChats, findChat };