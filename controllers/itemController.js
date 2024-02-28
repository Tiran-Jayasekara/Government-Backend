const Item = require("../models/itemModal");
const Joi = require("joi").extend(require("@joi/date"));

function validateItem(req) {
    const schema = Joi.object({
        itemName: Joi.string().required(),
        img: Joi.string().min(5).required(),
        brand: Joi.string(),
        price: Joi.number().required(),
        offer: Joi.number().required(),
        company: Joi.string().required(),
        companyId: Joi.string().required(),
        availability: Joi.boolean(),
        itemType: Joi.string().required(),
        description: Joi.string().required(),
        searchKeyWord: Joi.string().required(),
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
            const { itemName, img, brand, price, offer, company, companyId, availability, itemType, description, searchKeyWord } = req.body;

            const item = await Item.create({
                itemName, img, brand, price, offer, company, companyId, availability, itemType, description, searchKeyWord
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

// Get Items By Shop
module.exports.ItemByShop = async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const ItemsByShop = await Item.find({ companyId: shopId });
        if (ItemsByShop.length > 0) {
            res.status(200).json({ message: "Items By Shop", ItemsByShop });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items by this Company" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get All Items
module.exports.AllItems = async (req, res) => {
    try {
        const pageNumber = req.params.number;
        const allItems = await Item.find({});
        if (allItems.length > 0) {
            res.status(200).json({ message: "All Items", allItems });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Pagination
module.exports.getSelectetItems = async (req, res) => {
    try {
        const pageNumber = req.params.number || 1; // Default to page 1 if no page number is provided
        const perPage = 10; // Number of items per page
        const skip = (pageNumber - 1) * perPage;

        const allItems = await Item.find({}).skip(skip).limit(perPage);

        if (allItems.length > 0) {
            res.status(200).json({ message: "All Items", allItems });
        } else {
            res.status(200).json({ message: "Couldn't find any Items" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update Item
module.exports.UpdateItem = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        itemName: Joi.string().required(),
        img: Joi.string().min(5).required(),
        brand: Joi.string(),
        price: Joi.number().required(),
        offer: Joi.number().required(),
        company: Joi.string().required(),
        companyId: Joi.string().required(),
        availability: Joi.boolean(),
        itemType: Joi.string().required(),
        description: Joi.string().required(),
        searchKeyWord: Joi.string().required(),
    });

    try {
        const { _id, itemName, img, brand, price, offer, company, itemType, companyId, availability, description, searchKeyWord } = req.body;
        const { error } = schema.validate({
            _id, itemName, img, brand, price, offer, company, companyId, availability, itemType, description, searchKeyWord
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateItem = await Item.findOneAndUpdate({ _id: _id }, { itemName, img, brand, price, offer, company, companyId, availability, itemType, description, searchKeyWord }, { new: true });
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

// getItemsBySearch
module.exports.getItemsBySearch = async (req, res) => {
    try {
        const search = req.params.search;
        const items = await Item.find({
            $or: [
                { searchKeyWord: { $regex: search, $options: 'i' } },
            ],
        });
        if (items.length > 0) {
            res.status(200).json({ message: "Items", items });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items by this Search" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// getRandomItemsByItemType
module.exports.getRandomItemsByItemType = async (req, res) => {
    try {
        // Aggregation pipeline to select one random item per itemType
        const items = await Item.aggregate([
            { $group: { _id: '$itemType', item: { $first: '$$ROOT' } } },
            { $replaceRoot: { newRoot: '$item' } }
        ]);

        if (items.length > 0) {
            res.status(200).json({ message: "Random Items", items });
        } else {
            res.status(200).json({ message: "No items found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete Items By shop
module.exports.deleteItemByCompany = async (req, res) => {
    try {
        const companyName = req.params.company;
        const deleteItems = await Item.deleteMany({ company: companyName });
        if (deleteItems) {
            res.status(200).json({ message: "Items Delete Success", deleteItems })
        } else {
            res.status(400).json({ message: "Couldnt find Items by Cmpany " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

