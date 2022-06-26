const categoryService = require("../service/categoryService");

exports.getCategory = async (req, res) => {
    try {
        const {query} = req
        const resultGetCategory = await categoryService.getCategory(query);
        return res.json({
            status: true,
            message: "Success",
            data: resultGetCategory
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const {body} = req
        if (!body.name ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }
        
        const createdCategory = await categoryService.addCategory(body);
        return res.json({
            status: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};

exports.detailsCategory = async (req, res) => {
    try {
        const {params} = req
        if (!params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param"
            });
        }
        
        const detailsCategory = await categoryService.detailsCategory(params.id);
        return res.json({
            status: true,
            message: "Success",
            data: detailsCategory
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const {body, params} = req
        if (!body.name || !params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param & field"
            });
        }
        
        const updatedCategory = await categoryService.updateCategory(body, params.id);
        return res.json({
            status: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const {params} = req
        if (!params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param"
            });
        }
        
        const deleteCategory = await categoryService.deleteCategory(params.id);
        return res.json({
            status: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};