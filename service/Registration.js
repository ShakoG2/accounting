const userModel = require("../model/User");
const bcrypt = require("bcrypt");

exports.register = async (request, response) => {

    const {userName, email, password} = request.body;

    if (!userName || !email || !password) {
        response.status = 400;
        response.send(`input is required!`)
        return response;
    }

    const existingUser = await userModel.findOne({$or: [{userName}, {email}]});

    if (existingUser) {
        response.status = 400;
        response.send(`user with ${userName} or ${email} already exists!`)
        return response;
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({userName, email, password: hashedPassword});
        await user.save();
        response.send(await userModel.findOne({$or: [{userName}, {email}]}));
    } catch (error) {
        console.log("Error while register user " + request.body)
        return response.status(500).send(error);
    }
}