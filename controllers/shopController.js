const Joi = require("joi");
const Shop = require("../models/shopModal");

function validateCompany(req) {
    const schema = Joi.object({
        img: Joi.string().required(),
        header: Joi.array().items(Joi.object({
            img: Joi.string().required(),
            topic: Joi.string().required(),
            description: Joi.string().required()
        })).required(),
        name: Joi.string().required(),
        company: Joi.string().required(),
        shopType: Joi.string().required(),
        status: Joi.required(), // Assuming status is also a string
        description: Joi.string().required(),
        aboutUs: Joi.string().required(),
        aboutUsDescription: Joi.string().required(),
        gallery: Joi.object().required(), // Assuming gallery is an object
        testimonialsImg: Joi.string().required(),
        mapLocation: Joi.string().required(),
        getInTouch: Joi.object({
            number: Joi.string().required(),
            openingDate: Joi.string().required(),
            openingtime: Joi.string().required()
        }).required(), // Assuming getInTouch is an object with number, openingDate, and openingtime
        address: Joi.string().required(),
        deleteShop: Joi.required(),
    });
    return schema.validate(req);
}

// This method for add government company data
module.exports.addShop = async (req, res) => {
    try {
        const { error } = validateCompany(req.body);
        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const { img, header, name, company, shopType, status, description, aboutUs, aboutUsDescription, gallery, testimonialsImg, mapLocation, getInTouch, address, deleteShop } = req.body;
            const isShopAlreadyExist = await Shop.findOne({ company });
            if (isShopAlreadyExist) {
                res.status(200).json({ message: "This Shop is Already Exist !" });
            } else {
                const shopData = await Shop.create({
                    img, header, name, company, shopType, status, description, aboutUs, aboutUsDescription, gallery, testimonialsImg, mapLocation, getInTouch, address, deleteShop
                });

                if (shopData) {
                    console.log("shop Add Successfull");
                    res.status(200).json({ message: "Shop Add Successfull", shopData });
                } else {
                    res.status(200).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.getAllShops = async (req, res) => {
    try {
        const allShops = await Shop.find({ deleteShop: false }).select('_id img name status company description');

        if (allShops) {
            res.status(200).json({ message: "All Shops", allShops });
        } else {
            res.status(200).json({ message: "No Shops" });
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};


module.exports.OneShopData = async (req, res) => {
    try {
        const shopName = req.params.shop;
        const ShopData = await Shop.find({ company: shopName });
        if (ShopData.length > 0) {
            res.status(200).json({ message: "Shop Data", ShopData });
        } else {
            res
                .status(200)
                .json({ message: `Couldn't find any ShopData by this ${shopName}` });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.UpdateShop = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        img: Joi.string().required(),
        header: Joi.array().items(Joi.object({
            img: Joi.string().required(),
            topic: Joi.string().required(),
            description: Joi.string().required()
        })).required(),
        name: Joi.string().required(),
        company: Joi.string().required(),
        shopType: Joi.string().required(),
        status: Joi.required(), // Assuming status is also a string
        description: Joi.string().required(),
        aboutUs: Joi.string().required(),
        aboutUsDescription: Joi.string().required(),
        gallery: Joi.object().required(), // Assuming gallery is an object
        testimonialsImg: Joi.string().required(),
        mapLocation: Joi.string().required(),
        getInTouch: Joi.object({
            number: Joi.string().required(),
            openingDate: Joi.string().required(),
            openingtime: Joi.string().required()
        }).required(), // Assuming getInTouch is an object with number, openingDate, and openingtime
        address: Joi.string().required(),
        deleteShop: Joi.required(),
    });

    try {
        const { _id, img, header, name, company, shopType, status, description, aboutUs, aboutUsDescription, gallery, testimonialsImg, mapLocation, getInTouch, address, deleteShop } = req.body;
        const { error } = schema.validate({
            _id, img, header, name, company, shopType, status, description, aboutUs, aboutUsDescription, gallery, testimonialsImg, mapLocation, getInTouch, address, deleteShop
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateShop = await Shop.findOneAndUpdate({ _id: _id }, { img, header, name, company, shopType, status, description, aboutUs, aboutUsDescription, gallery, testimonialsImg, mapLocation, getInTouch, address, deleteShop }, { new: true });
            if (updateShop) {
                res.status(200).json({ message: "Update Shop", updateShop });
            } else {
                res.status(400).json({ message: "Update Shop UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.deleteShop = async (req, res) => {
    try {
        const shopID = req.params.id;
        const deleteShop = await Shop.findByIdAndDelete(shopID);
        if (deleteShop) {
            res.status(200).json({ message: "Shop Delete Success", deleteShop })
        } else {
            res.status(400).json({ message: "Couldnt find Shop " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.UpdateShopStatus = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        company: Joi.string().required(),
        status: Joi.required(),
    });

    try {
        const { _id, company, status } = req.body;
        const { error } = schema.validate({
            _id, company, status
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateShopStatus = await Shop.findOneAndUpdate({ _id: _id }, { status }, { new: true });
            if (updateShopStatus) {
                res.status(200).json({ message: "Update Shop Status", updateShopStatus });
            } else {
                res.status(400).json({ message: "Update Shop UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}