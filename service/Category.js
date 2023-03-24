const categoryModel = require("../model/Category");

/**
 * method which add new categories in category schema
 * @param request request parameter which has session and other important information, and also request body
 * @param response
 * @returns {Promise<*>}
 */
exports.addCategories = async (request, response) => {
    const {name, creatorUserId, active} = request.body;
    if (!name) {
        response.status = 400;
        response.send("inputs is required!")
        return response;
    }
    const existingCategory = await categoryModel.findOne({name});
    if (existingCategory) {
        response.status = 400;
        response.send(`category with name ${name} already exists!`);
    }
    try {
        const userId = request.session.userId;
        const category = new categoryModel({
            name,
            createdDate: Date.now(),
            creatorUserId: userId,
            active: true,
            lastModifiedUserId: userId,
            lastUpdatedDate: Date.now()
        });
        category.save()
        return response.send(category);
    } catch (err) {
        console.log(err)
    }
}

/**
 * method which updated category  witch existing category id
 * and set important information to category e.g user id who updated this category and date when he/she update
 */
exports.updateCategory = async (request, response) => {
    const categoryId = request.params.id;
    if (!categoryId) {
        response.status = 400;
        response.send("Invalid categoryId provided!")
    }
    const updatedCategory = request.body;

    if (!request.body.name) {
        response.status = 400;
        response.send("inputs is required!")
        return response;
    }
    try {
        const existingCategory = await categoryModel.findById(categoryId);
        const options = {new: true};
        if (!existingCategory) return response.status(404).send(`category with ${categoryId} doesn't exists!`);
        updatedCategory.lastModifiedUserId = request.session.userId;
        updatedCategory.lastUpdatedDate = Date.now();
        const category = await categoryModel.findOneAndUpdate({_id: categoryId}, updatedCategory, options);
        return response.status(200).send(category);
    } catch (err) {
        console.log(err);
    }
}

/**
 * method which deActive category , set model active to false , it doesn't delete data in database!
 */
exports.deActiveCategory = async (request, response) => {
    const categoryId = request.params.id;
    if (!categoryId) return response.status(404).send("invalid category id provided!");
    const existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) return response.status(404).send(`category with ${categoryId} doesn't exists!`);
    try {
        await categoryModel.updateOne({_id: categoryId}, {$set: {active: false}});
        return response.status(200);
    } catch (err) {
        console.log(err);
        return response.status(500).send(`unknown error while deActivate category with id ${categoryId}`);
    }
}