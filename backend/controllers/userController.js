const UserModel = require('../models/UserModel');

const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findById(id);

        if (user) {
            const {password, ...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("User doesn't exist");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getUser };