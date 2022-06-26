const blogService = require("../service/blogService");

exports.getBlog = async (req, res) => {
    try {
        const {query} = req
        const resultGetBlog = await blogService.getBlog(query);
        return res.json({
            status: true,
            message: "Success",
            data: resultGetBlog
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};
exports.getMyBlog = async (req, res) => {
    try {
        const {query} = req
        const resultGetMyBlog = await blogService.getMyBlog(query, req.userData.user_id);
        return res.json({
            status: true,
            message: "Success",
            data: resultGetMyBlog
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};
exports.addBlog = async (req, res) => {
    try {
        const {body} = req
        if (!body.title || !body.description || !body.category_id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }

        const newBlog = {
            ...body,
            user : req.userData
        }
        
        const createdBlog = await blogService.addBlog(newBlog);
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
exports.detailsBlog = async (req, res) => {
    try {
        const {params} = req
        if (!params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param"
            });
        }
        
        const detailsBlog = await blogService.detailsBlog(params.id);
        return res.json({
            status: true,
            message: "Success",
            data: detailsBlog
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};
exports.updateBlog = async (req, res) => {
    try {
        const {body, params} = req
        if (!body.title || !body.description || !body.category_id || !params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param & field"
            });
        }
        
        const updatedBlog = await blogService.updateBlog(body, params.id);
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
exports.deleteBlog = async (req, res) => {
    try {
        const {params} = req
        if (!params.id ) {
            return res.status(400).json({
                status: false,
                message: "Please complete query param"
            });
        }
        
        const deleteBlog = await blogService.deleteBlog(params.id);
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