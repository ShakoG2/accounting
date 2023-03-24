const entryModel = require("../model/Entry")
const categoryModel = require("../model/Category")
const Entry = require("../model/Entry");


exports.makeEntry = async (request, response) => {
    let {
        type,
        amount,
        name,
        categoryId,
        status
    } = request.body;
    if (!type || !amount || !name || !categoryId || !status) {
        return response.status(404).send("All fields are required");
    }
    const category = await categoryModel.findById(categoryId);
    if (!category) return response.status(404).send(`category with id ${categoryId} doesn't exists!`);
    const userId = request.session.userId;
    /**
     * if type is income , amount is positive and otherwise amount is negative
     */
    if (type === "INCOME") amount = Math.abs(amount);
    else amount = -amount;

    try {
        const entry = new entryModel({
            type,
            name,
            amount,
            categoryId,
            status,
            creatorUserId: userId,
            active: true,
            createdDate: Date.now(),
            lastModifiedUserId: userId,
            lastUpdatedDate: Date.now()
        })
        entry.save();
        return response.status(200).send("Entry successfully created!")
    } catch (err) {
        console.log(err);
        return response.status(500).send("Unknown error while make Entry !" + err);
    }
}

exports.getEntries = async (request, response) => {
    let {
        type,
        amount,
        dateFrom,
        dateTo,
        status,
        sortWithAmountDesc
    } = request.query;
    const filter = {
        type: type,
        amount: {$gt: amount},
        status: status,
        createdDate: {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo)
        }
    };
    const sort = {
        amount: sortWithAmountDesc ? -1 : 1
    };

    try {
        await Entry.find(filter).sort(sort).exec((err, entries) => {
            if (err) {
                console.error(err);
                return;
            }
            return response.status(200).send(entries);
        });
    } catch (err) {
        console.log(err)
        return response.status(500).send("Unknown error while retrieve entries from database!");
    }

}
