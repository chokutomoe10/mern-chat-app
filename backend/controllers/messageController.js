const messageModel = require('../models/MessageModel');

const addMessage = async(req, res) => {
    const {chatId, senderId, text} = req.body;
    const message = new messageModel({
        chatId, senderId, text
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const getMessages = async(req, res) => {
    const {chatId} = req.params;
    try {
        const result = await messageModel.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { addMessage, getMessages };