const Item = require("../models/itemModal");
const Joi = require("joi").extend(require("@joi/date"));

function validateItem(req) {
    const schema = Joi.object({
        itemName: Joi.string().required(),
        img: Joi.string().min(5).required(),
        brand: Joi.string(),
        price: Joi.string(),
        company: Joi.string().required(),
        itemType: Joi.string().required(),
        description: Joi.string().required(),
    });
    return schema.validate(req);
}

// Add Item Part
module.exports.addItem = async (req, res) => {
    try {
        const { error } = validateItem(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const { itemName, img, brand, price, company, itemType, description } = req.body;

            const item = await Item.create({
                itemName, img, brand, price, company, itemType, description
            });
            if (item) {
                console.log("Item Add Successfull");
                res.status(200).json({ message: "Item Add Successfull", item });
            } else {
                res.status(400).json({ message: "Unsuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Get Items By Company
module.exports.ItemByCompany = async (req, res) => {
    try {
        const companyName = req.params.company;
        const ItemsByCompany = await Item.find({ company: companyName });
        if (ItemsByCompany.length > 0) {
            res.status(200).json({ message: "Items By Company", ItemsByCompany });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items by this Company" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Item
module.exports.UpdateItem = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        itemName: Joi.string().required(),
        img: Joi.string().min(5).required(),
        brand: Joi.string(),
        price: Joi.string(),
        company: Joi.string().required(),
        itemType: Joi.string().required(),
        description: Joi.string().required(),
    });

    try {
        const { _id, itemName, img, brand, price, company, itemType, description } = req.body;
        const { error } = schema.validate({
            _id, itemName, img, brand, price, company, itemType, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateItem = await Item.findOneAndUpdate({ _id: _id }, { itemName, img, brand, price, company, itemType, description }, { new: true });
            if (updateItem) {
                res.status(200).json({ message: "Item Update Success", updateItem });
            } else {
                res.status(400).json({ message: "item Update UnSuccess" });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        const ItemId = req.params.id;
        const deleteItem = await Item.findByIdAndDelete(ItemId);
        if (deleteItem) {
            res.status(200).json({ message: "Item Delete Success", deleteItem })
        } else {
            res.status(400).json({ message: "Couldnt find Item " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
